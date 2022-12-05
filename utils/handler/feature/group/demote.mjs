const handle = async (m, { q, conn, isBotAdmin, isAdmin, repl }) => {
	if (!isAdmin && !m.isOwn) return repl(q.admin)
	if (!isBotAdmin) return repl(q.botadmin)
	let user = m.react ? m.rtarget : m.mentionedJid[0] ? m.mentionedJid[0]: m.quoted ? m.quoted.sender: m.query.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
	conn.groupParticipantsUpdate(m.chat, [user], 'demote')
		.then(v=> repl(q.sukses))
		.catch(v=> repl(q.gagal))
};

export default handle;