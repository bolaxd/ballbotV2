const handle = async (
   m,
   { up, q, d, conn, isBotAdmin, isAdmin, budy, repl, db }
) => {
   if (!m.isGc) return;
   let i = db.grup.findIndex((v) => v[0] == m.chat);
   if (db.grup[i][1].antiluar) {
      if (!m.sender.startsWith("62")) {
         await conn.sendteks(
            m.chat,
            "[ ANTI ORANG LUAR ]\ngroup ini dilengkapi dengan anti nomor luar",
            d.f1("Notifikasi Keamanan Group", "")
         );
         if (isAdmin) return await repl("Maaf Kamu admin ternyata");
         if (m.isOwn) return await repl("Oh tidak, kamu ownerku");
         if (!isBotAdmin) return await repl("Oh tidak, Bot not admin");
         await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
   }
};

export default handle;
