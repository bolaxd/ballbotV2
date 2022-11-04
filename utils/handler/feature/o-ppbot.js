
export const handle = async (m, { q, conn, mime, quoted, bot }) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	if (/image/.test(mime)) {
		let pp = await quoted.download()
		await conn.createprofile(bot, pp)
		.then(i=>conn.sendteks(m.chat, q.sukses, m))
		.catch(e=> conn.sendMessage(m.chat, q.gagal, m))
	} else conn.sendteks(m.chat, q.forimg, m);
}