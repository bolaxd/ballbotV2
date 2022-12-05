import { imgToStiker, vidToStiker } from "../../../util/convert-media.mjs";

const handle = async (m, { q, conn, d, quoted, mime, bot, repl, db }) => {
   let teks = "reply foto / kirim foto dengan caption .stiker";
   if (!quoted) return repl(teks);
   if (!/(image\/(jpe?g|png)|video\/(mp4|mov))/.test(mime)) return repl(teks);
   let buf = await quoted.download();
   let n = db.set.findIndex((v) => v[0] == bot);
   if (/image\/(jpe?g|png)/.test(mime))
      conn.sendstik(
         m.chat,
         await imgToStiker(buf, {
            name: db.set[n][1].pack,
            author: db.set[n][1].auth,
         }),
         m,
         d.f2("", q.thumb2, "")
      );
   else if (/video\/(mp4|mov)/.test(mime))
      conn.sendstik(
         m.chat,
         await vidToStiker(buf, {
            name: db.set[n][1].pack,
            author: db.set[n][1].auth,
         }),
         m,
         d.f2("", q.thumb2, "")
      );
};

export default handle;