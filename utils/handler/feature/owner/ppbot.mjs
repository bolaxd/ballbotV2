const handle = async (m, { q, conn, mime, quoted, bot, repl }) => {
	if (!m.isOwn) return repl(q.owner)
	if (/image/.test(mime)) {
		let pp = await quoted.download()
		await conn.createprofile(bot, pp)
		.then(i=>repl(q.sukses))
		.catch(e=> repl(q.gagal))
	} else repl(q.forimg);
};

export default handle;