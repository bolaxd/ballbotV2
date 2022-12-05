const handle = async (m, { q, conn, isAdmin, isBotAdmin, quoted, mime, repl }) => {
	if (!m.isGc) return repl(q.forgc);
	if (!isAdmin) return repl(q.admin);
	if (/image/.test(mime)) {
		let pp = await quoted.download()
		await conn.createprofile(m.chat, pp)
		.then(i=>repl(q.sukses))
		.catch(e=> repl(q.gagal))
	} else repl(q.forimg);
};

export default handle;