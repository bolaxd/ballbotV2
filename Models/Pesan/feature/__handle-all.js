
export const all = async(m, up, q, b, conn, grup) => {
	let { isBotAdmin, isAdmin } = grup
	let budy = typeof m.text == 'string' ? m.text : ''
	let chatbot = await conn.createJid(conn.user.id)
	if (!m.chat.endsWith(q.idgc)) return
	if (conn.db.data.chat[m.chat].antilink) {
		if (budy.match(`chat.whatsapp.com`)) {
			if (isAdmin) return
			if (m.isOwn) return
			if (!isBotAdmin) return 
			conn.sendteks(m.chat, '[ ANTI LINK ]\ngroup ini dilengkapi dengan anti link\nanda melanggar larangan bot\nAnda berhak di kick', b.f1('Notifikasi Keamanan group', ''))
			await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} })
			setTimeout(async function() {
				await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
			}, 5000);
		}
	}
	if (conn.db.data.chat[m.chat].antistik) {
		if (m.mtype === 'stickerMessage') {
			if (isAdmin) return
			if (m.isOwn) return
			if (!isBotAdmin) return 
			await conn.sendteks(m.chat, '[ ANTI STICKER ]\ngroup ini dilengkapi dengan anti sticker\nanda melanggar larangan bot\nAnda berhak di kick', b.f1('Notifikasi Keamanan group', ''))
			await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} })
			setTimeout(async function() {
				await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
			}, 5000);
		}
	}
	if (conn.db.data.chat[m.chat].antibot) {
		if (up.key.id.startsWith('BAE5') && !up.key.fromMe) {
			if (isAdmin) return
			if (m.isOwn) return
			if (!isBotAdmin) return 
			conn.sendteks(m.chat, '[ ANTI BOT ]\ngroup ini dilengkapi dengan anti bot\nanda melanggar larangan bot\nAnda berhak di kick', b.f1('Notifikasi Keamanan group', ''))
			await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} })
			setTimeout(async function() {
				await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
			}, 5000);
		}
	}
	if (conn.db.data.chat[m.chat].antivn) {
		if (m.mtype === 'audioMessage') {
			if (isAdmin) return
			if (m.isOwn) return
			if (!isBotAdmin) return 
			conn.sendteks(m.chat, '[ ANTI VOICE NOTE ]\ngroup ini dilengkapi dengan anti VN\nanda melanggar larangan bot\nAnda berhak di kick', b.f1('Notifikasi Keamanan group', ''))
			await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} })
			setTimeout(async function() {
				await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
			}, 5000);
		}
	}
}