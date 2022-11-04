export const handle = async (m, { q, conn, isAdmin, isBotAdmin, members }) => {
	if (!m.isGc) return conn.sendteks(m.chat, q.forgc, m);
	if (!isAdmin) return conn.sendteks(m.chat, q.admin, m);
	let uvuv = members.map(v => conn.createJid(v.id))
	let pesan = `Pesan: ${m.query ? m.query : 'Tidak ada'}\n`
		 uvuv.map(v=> pesan += `@${v.split('@')[0]}\n`)
	conn.sendteks(m.chat, pesan, m, {mentions: uvuv})
}