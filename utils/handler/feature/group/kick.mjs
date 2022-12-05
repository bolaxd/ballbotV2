const handle = async (m, { q, conn, isBotAdmin, isAdmin, repl }) => {
	if (!isAdmin && !m.isOwn) return repl(q.admin)
	if (!isBotAdmin) return repl(q.botadmin)
	if (m.mentionedJid) {
		m.mentionedJid.map(async v=> {
			await q.delay(2000);
			conn.groupParticipantsUpdate(m.chat, [v], 'remove')
			.then(v=> repl(q.sukses))
			.catch(v=> repl(q.gagal))
		})
	} else {
		let user = m.react ? m.rtarget : m.quoted ? m.quoted.sender: m.query.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		conn.groupParticipantsUpdate(m.chat, [user], 'remove')
			.then(v=> repl(q.sukses))
			.catch(v=> repl(q.gagal))
	}
};

export default handle;