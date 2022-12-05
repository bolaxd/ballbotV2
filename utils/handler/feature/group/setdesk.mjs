const handle = async (m, { q, conn, isAdmin, isBotAdmin, quoted, quotry, repl }) => {
	if (!m.isGc) return repl(q.forgc);
	if (!isAdmin) return repl(q.admin);
	if (!isBotAdmin) return repl(q.botadmin);
	if (!quoted) return repl(q.forteks)
	conn.groupUpdateDescription(m.chat, quotry)
	.then(v => repl(q.sukses))
	.catch(v => repl(q.gagal))
};

export default handle;