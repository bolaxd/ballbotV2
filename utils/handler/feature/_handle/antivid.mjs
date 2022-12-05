
const handle = async(m, { up, q, d, conn, isBotAdmin, isAdmin, budy, repl, db }) => {
  if (!m.isGc) return;
   let i = db.grup.findIndex((v) => v[0] == m.chat);
   if (db.grup[i][1].antivid) {
		if (m.mtype === 'videoMessage') {
			await conn.sendteks(m.chat, '[ ANTI VIDEO ]\ngroup ini dilengkapi dengan anti Video\nVideo anda dihapus bot', d.f1('Notifikasi Keamanan Group', ''))
			if (isAdmin) return await repl('Maaf Kamu admin ternyata');
			if (m.isOwn) return await repl('Oh tidak, kamu ownerku');
			if (!isBotAdmin) return await repl('Oh tidak, Bot not admin');
			await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} });
		}
	}
};

export default handle;