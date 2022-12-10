import { imgToStiker } from "../../../util/convert-media.mjs";
import fetch from "node-fetch";

const handle = async (m, { q, conn, repl, bot, db }) => {
   let [t1, t2] = m.query.split("+");
   let n = db.set.findIndex((v)=> v[0] == bot);
   let res = await (await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(t1)}_${encodeURIComponent(t2)}`)).json();
   //if (res.results[0] === undefined) return repl("Mix emoji tidak tersedia");
   let res2 = await imgToStiker(await q.getbuff(res.results[0].url), {
      name: db.set[n][1].pack,
      author: db.set[n][1].auth,
   });
   conn.sendstik(m.chat, res2, m);
};

export default handle;