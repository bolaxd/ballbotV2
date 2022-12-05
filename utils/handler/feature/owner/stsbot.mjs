const handle = async (m, { q, conn, quotry, repl }) => {
	if (!m.isOwn) return repl(q.owner);
	if (!quotry) return repl(q.teks);
	if (quotry.length >= 283) return repl('Teks tidak boleh lebih dari 139 karakter');
	await conn.updateProfileStatus(m.query)
	.then(_=>repl(q.sukses))
	.catch(_=> repl(q.gagal))
}

export default handle;