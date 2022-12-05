const handle = async (m, { q, conn, quotry }) => {
	if (!m.isOwn) return repl(q.owner);
	if (!quotry) return repl(q.teks);
	if (quotry.length >= 100) return repl('Nama tidak boleh lebih dari 100 karakter');
	await conn.updateProfileName(m.query)
	.then(_=>repl(q.sukses))
	.catch(_=> repl(q.gagal))
};

export default handle;