import fs from "fs";
import s from "similarity";
import { format } from "util";

let path = "./utils/handler/feature/";
export default async (m, extra) => {
   let {
      q,
      d,
      bb,
      bot,
      conn,
      isblock,
      up,
      isAdmin,
      isBotAdmin,
      isPrem,
      repl,
      db,
   } = extra;
   /* Aku dapet dari : https://stackoverflow.com/questions/36367532/how-can-i-conditionally-import-an-es6-module */
   const e_ = async (err) => {
   	conn.sendteks(m.chat, `Maaf!!!\nAda yang error :(\nLaporan error dikirim ke owner otomatis untuk diperbaiki...`, m)
      q.developer.map(async (v) => {
         await q.delay(3000);
         conn.sendteks(v + q.idwa,`Command : /${m.command}\nOleh : @${m.sender.split("@")[0]}\n\n${bb(format(err))}`,d.f1(err, ""),{ mentions: [m.sender] });
      });
   };
   conn.file = conn.file ? conn.file : {};
   let cate = fs.readdirSync(path);
   for (let b of cate.filter(
      (_) => _.startsWith("_") && !_.endsWith(".mjs") && !_.endsWith(".json")
   )) {
      let file = fs.readdirSync(path + b);
      for (let u of file) {
         conn.file[u.split(".")[0]] = Date.now();
         if (m.message && !isblock) {
            let read = await import(
               `./${b}/${u}?update=${conn.file[u.split(".")[0]] || Date.now()}`
            );
            try {
               read.default(m, extra);
            } catch (e) {
               let position = file.indexOf(u);
               file.splice(position, 1);
               e_(e);
            }
         }
      }
   }

    let o = db.set.findIndex((v) => v[0] == bot);
   for (let u of db.cmd) {
      if (m.command !== u[0]) continue;
      let i = db.cmd.findIndex((v) => v[0] == m.command);
      conn.file[u[1].split("/")[1]] = Date.now();
      // ketika dia di block
      if (m.command && isblock) continue;
      // ketika mode self / public
      if (m.command && !m.isOwn && !db.set[o][1].publik) {
         repl(`Bot sekarang sedang mode Owner...`);
         continue;
      }
      // ketika mode maintrnance all
      if (m.command && !m.isOwn && db.set[o][1].main) {
         repl(`Bot sekarang sedang mode maintenance...`);
         continue;
      }
      // ketika mode group
      if (m.command && m.isPc && db.set[o][1].group && !m.isOwn && !isPrem) {
         let gc = `https://chat.whatsapp.com/HV8JID9hBhsD6ogvpKLMg8`;
         conn.sendteks(
            m.chat,
            `${q.name} Mode group\n\nsilahkan Join ke group bot untuk berkomunikasi dengan bot\nBergabunglah dengan user premium agar bebas chat bot kapan saja!!!`,
            m,
            d.f2(q.name + " Mode group", q.thumb2, gc)
         );
         continue;
      }
      if (m.command && !isPrem && db.cmd[i][2][6]) {
         repl("Fitur ini khusus member premium...");
         continue;
      }
      if (m.command && !m.isOwn && db.cmd[i][2][3]) {
         repl("Fitur ini telah di ban owner sementara...");
         continue;
      }
      if (m.command && !m.isOwn && db.cmd[i][2][4]) {
         repl("Fitur ini sedang dalam pemeliharaan system...");
         continue;
      }
      if (m.command && !m.isOwn && db.cmd[i][2][0]) {
         repl("Fitur ini khusus owner...");
         continue;
      }
      if (m.command && !m.isGc && db.cmd[i][2][1]) {
         repl("Fitur ini khusus di group...");
         continue;
      }
      if (m.command && !m.isPc && db.cmd[i][2][2]) {
         repl("Fitur ini khusus di Pribadi chat...");
         continue;
      }
      if (m.command && !isAdmin && db.cmd[i][2][7]) {
         repl("Fitur ini khusus admin group...");
         continue;
      }

      if (m.command && !isBotAdmin && db.cmd[i][2][8]) {
         repl("Bot harus admin jika ingin gunakan fitur ini");
         continue;
      }
      if (s(u[0], m.command) >= 1)
         (
            await import(
               `./${u[1]}.mjs?update=${
                  db.cmd[i][2][9] || Date.now()
               }`
            )
         )
            .default(m, extra)
            .catch((e) => e_(e));
   }
};
