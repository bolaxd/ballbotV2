const handle = async (
   m,
   { up, q, d, conn, isBotAdmin, isAdmin, budy, repl, db }
) => {
   if (!m.isGc) return;
   let i = db.grup.findIndex((v) => v[0] == m.chat);
   if (db.grup[i][1].antivn) {
      if (m.mtype === "audioMessage") {
         await conn.sendteks(
            m.chat,
            "[ ANTI VOICE NOTE ]\ngroup ini dilengkapi dengan anti VN\nVN anda dihapus bot",
            d.f1("Notifikasi Keamanan Group", "")
         );
         if (isAdmin) return repl("Maaf Kamu admin ternyata");
         if (m.isOwn) return repl("Oh tidak, kamu ownerku");
         if (!isBotAdmin) return repl("Oh tidak, Bot not admin");
         await conn.sendMessage(m.chat, {
            delete: {
               remoteJid: m.chat,
               fromMe: false,
               id: m.id,
               participant: m.sender,
            },
         });
      }
   }
};

export default handle;
