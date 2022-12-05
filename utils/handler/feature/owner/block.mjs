const handle = async (m, { q, conn, lblock }) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	let use = m.mentionedJid [0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender: m.query.replace(/[^0-9]/g, '') + q.idwa
	if (!lblock.includes(use)) {
		conn.sendteks(use, "Anda Telah di block oleh owner", m)
		await q.delay(3000)
		conn.updateBlockStatus(use, 'block')
			.then(v=> conn.sendteks(m.chat, 'Sukses Block user tersebut!!!, Silahkan Lihat di .listblock', m))
			.catch(e=> conn.sendteks(m.chat, q.gagal, m))
	}
	else if (lblock.includes(use)) {
		conn.updateBlockStatus(use, 'unblock')
			.then(v=> conn.sendteks(m.chat, 'Sukses UnBlock user tersebut!!!, Silahkan Lihat di .listblock', m))
			.catch(e=> conn.sendteks(m.chat, q.gagal, m))
			await q.delay(3000)
			conn.sendteks(use, "Anda Telah di unblock oleh owner", m)
	}
};

export default handle;