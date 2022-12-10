import { users, groups, sets } from "../schema/index.mjs";
import { parser, detect } from "./index.mjs";
import cmds from "./feature/controlers.mjs";
import printToConsole from "../print.mjs";
import d from "../helper/fake.mjs";

const bb = (teks) => "```" + teks + "```";
const isntNull = (x) => x !== null;
const findAdmin = (arr) => arr.filter((v) => v.admin !== null).map((i) => i.id);
let cache = new Map();

export default async (iqbal, serve, s, db, q) => {
   try {
   serve.conn2 = serve.conn2 ? serve.conn2 : {}
      let up = iqbal.messages[0];
      if (!up) return;
      //if (up.key.remoteJid === q.idst) return;
      await serve.readMessages([up.key]);
      if (up.key.id.endsWith("BOLA") && up.key.id.length === 32) return;
      if (up.key.id.startsWith("3EB0") && up.key.id.length === 12) return;
      //console.log(up);
      let m = parser(serve, up, s);
      let bot = await serve.createJid(serve.user.id);
      if (m.isGc) {
         if (!cache.has(m.chat)) {
            cache.set(
               m.chat,
               await serve.groupMetadata(m.chat).catch((_) => {})
            );
            console.log(`Pembuatan metadata pada: ${m.chat} telah siap`);
            // hidupin aja yg bawah ini, tapi nanti bakal kena marah orang
            // if (!up.messageStubType) serve.sendteks(m.chat, `Metadata pada group ini berhasil di buat!!!\nKlik detail metadata dengan mengetikan .info`, m)
         }
      }
      let extra = {};
      extra.q = q;
      extra.d = d;
      extra.up = up;
      extra.bb = bb;
      extra.findAdmin = findAdmin;
      extra.conn = serve;
      extra.cache = cache;
      extra.db = {
         users: db.user,
         grup: db.grup,
         set: db.set,
         cmd: serve.readjson(q.jsoncmd),
      };
      extra.repl = (text) => serve.sendteks(m.chat, text, m);
      extra.isNum = (x) => typeof x == "number" && isNaN(x);
      extra.more = String.fromCharCode(8206).repeat(4001);
      extra.budy = typeof m.text == "string" ? m.text : "";
      extra.bot = bot;
      extra.lblock = await serve.fetchBlocklist().catch((_) => []);
      extra.isblock = m.isGc ? extra.lblock.includes(m.sender) : false;
      extra.meta = m.isGc ? await cache.get(m.chat) : {} || {};
      extra.members = m.isGc ? await extra.meta?.participants : [] || [];
      extra.admins = m.isGc ? await findAdmin(extra.members) : [] || [];
      extra.isAdmin = m.isGc ? extra.admins.includes(m.sender) : false;
      extra.isBotAdmin = m.isGc ? extra.admins.includes(extra.bot) : false;
      extra.isPrem = q.prems.map((v) => v + q.idwa).includes(m.sender);
      extra.getpp = async (sender) =>
         await serve.profilePictureUrl(sender, "image").catch((e) => q.thumb2);
      extra.quoted = m.quoted ? m.quoted : m;
      extra.quotry = m.quoted ? m.quoted.text : m.query;
      extra.mime =
         (extra.quoted.msg || extra.quoted).mimetype ||
         extra.quoted.mediaType ||
         "";
      if (m.command == "setdbcmd")
         (await import(`./feature/owner/fordb.mjs?update=${Date.now()}`))
         .default(m, extra);
      users(m, extra);
      groups(m, extra);
      sets(m, extra);
      printToConsole(m, extra);
      detect(m, extra);
      cmds(m, extra);
   } catch (e) {
      console.error(e);
   }
};