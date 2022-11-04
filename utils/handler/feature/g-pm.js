export const handle = async (m, { q, conn, isBotAdmin, isAdmin }) => {
	if (!isAdmin && !m.isOwn) return conn.sendteks(m.chat, q.admin, m)
	if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
	let user = m.react ? m.rtarget : m.mentionedJid[0] ? m.mentionedJid[0]: m.quoted ? m.quoted.sender: m.query.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
	conn.groupParticipantsUpdate(m.chat, [user], 'promote')
		.then(v=> conn.sendteks(m.chat, q.sukses, m))
		.catch(v=> conn.sendteks(m.chat, q.gagal, m))
}