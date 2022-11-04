
export const handle = async (m, { q, conn, isAdmin, isBotAdmin, quoted, mime }) => {
	if (!m.isGc) return conn.sendteks(m.chat, q.forgc, m);
	if (!isAdmin) return conn.sendteks(m.chat, q.admin, m);
	if (/image/.test(mime)) {
		let pp = await quoted.download()
		await conn.createprofile(m.chat, pp)
		.then(i=>conn.sendteks(m.chat, q.sukses, m))
		.catch(e=> conn.sendMessage(m.chat, q.gagal, m))
	} else conn.sendteks(m.chat, q.forimg, m);
}