export const handle = async (m, { q, conn, quotry }) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m);
	if (!quotry) return conn.sendteks(m.chat, q.teks, m);
	if (quotry.length >= 100) return conn.sendteks(m.chat, 'Nama tidak boleh lebih dari 100 karakter', m);
	await conn.updateProfileName(m.query)
	.then(_=>conn.sendteks(m.chat, q.sukses, m))
	.catch(_=> conn.sendteks(m.chat, q.gagal, m))
}