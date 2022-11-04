
export const handle = async(m, { up, q, d, conn, isBotAdmin, isAdmin, budy}) => {
	// REPLY
	const rep = async (teks) => await conn.sendteks(m.chat, teks, d.f1('Notifikasi Keamanan Group', ''))
	// DELETE
	const del = async () => await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} });
	// KICK
	const kik = async () => await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
	try {

		if (m.chat.endsWith(q.idgc)) {
	// DETECTOR LINK
			if (conn.db.data.chat[m.chat].antilink) {
				if (budy.match(`chat.whatsapp.com`)) {
					rep('[ ANTI LINK ]\ngroup ini dilengkapi dengan anti link\nanda melanggar larangan bot\nAnda berhak di kick');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
					kik();
				}
			}
			// DETECTOR STICKER
			if (conn.db.data.chat[m.chat].antistik) {
				if (m.mtype === 'stickerMessage') {
					rep('[ ANTI STICKER ]\ngroup ini dilengkapi dengan anti sticker\nSticker anda dihapus Bot');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
				}
			}
			// DETECTOR BOT
			if (conn.db.data.chat[m.chat].antibot) {
				if (up.key.id.startsWith('BAE5') && !up.key.fromMe) {
					rep('[ ANTI BOT ]\ngroup ini dilengkapi dengan anti bot\nanda melanggar larangan bot\nAnda berhak di kick');
					if (isAdmin) throw 'Maaf Kamu admin ternyata'
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					kik();
				}
			}
			// DETECTOR VN
			if (conn.db.data.chat[m.chat].antivn) {
				if (m.mtype === 'audioMessage') {
					rep('[ ANTI VOICE NOTE ]\ngroup ini dilengkapi dengan anti VN\nVN anda dihapus bot');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
				}
			}
			// DETECTOR VIDEO
			if (conn.db.data.chat[m.chat].antivid) {
				if (m.mtype === 'videoMessage') {
					rep('[ ANTI VIDEO ]\ngroup ini dilengkapi dengan anti Video\nVideo anda dihapus bot');
					if (isAdmin) throw 'Maaf Kamu admin ternyata'
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
				}
			}
			// DETECTOR IMAGE
			if (conn.db.data.chat[m.chat].antiimg) {
				if (m.mtype === 'imageMessage') {
					rep('[ ANTI IMAGE ]\ngroup ini dilengkapi dengan anti image\nImage anda dihapus bot');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
				}
			}
			// DETECTOR LUAR
			if (conn.db.data.chat[m.chat].antiluar) {
				if (!(m.sender.startsWith('62'))) {
					rep('[ ANTI ORANG LUAR ]\ngroup ini dilengkapi dengan anti nomor luar');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					kik();
				}
			}
		}
	} catch (e) {
		conn.sendteks(m.chat, e, m)
	}
};