const handle = async (
   m,
   { up, q, d, conn, isBotAdmin, isAdmin, budy, repl, db }
) => {
   let regexp = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;
   if (!m.isGc) return;
   let i = db.grup.findIndex((v) => v[0] == m.chat);
   if (db.grup[i][1].antilink) {
      if (regexp.exec(budy)) {
         if (
            budy.includes(
               `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
            )
         )
            return;
         await conn.sendteks(
            m.chat,
            "[ ANTI LINK ]\ngroup ini dilengkapi dengan anti link\nanda melanggar larangan bot\nAnda berhak di kick",
            d.f1("Notifikasi Keamanan Group", "")
         );
         if (isAdmin) return await repl("Maaf Kamu admin ternyata");
         if (m.isOwn) return await repl("Oh tidak, kamu ownerku");
         if (!isBotAdmin) return await repl("Oh tidak, Bot not admin");
         await conn.sendMessage(m.chat, {
            delete: {
               remoteJid: m.chat,
               fromMe: false,
               id: m.id,
               participant: m.sender,
            },
         });
         await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
   }
};

export default handle;
