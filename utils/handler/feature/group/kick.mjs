const handle = async (m, { q, conn, isBotAdmin, isAdmin, repl, members }) => {
	if (!isAdmin && !m.isOwn) return repl(q.admin)
	if (!isBotAdmin) return repl(q.botadmin)
	if (m.args[0] == 'all') {
		members.filter(v=> v.admin !== 'superadmin' && v.id !== conn.createJid(conn.user.id)).map(async v => {
			await q.delay(2000)
			await conn.groupParticipantsUpdate(m.chat, [v.id], 'remove')
		})
		repl('sukses kikk all user')
 	}
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