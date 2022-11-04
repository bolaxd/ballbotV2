export const handle = async (m, { q, d, conn }) => {
	let pp;try{ pp = await conn.profilePictureUrl(m.sender, 'image')} catch (e) { pp = q.thumb2 }
	let teks = m.query.length > 160 ? q.cut(m.query, 160) : m.query
	conn.sendteks(m.chat, `Si ${m.pushName} sekarang telah meninggal dan berwasiat pada bot: ${teks}\nJangan mention dia jangan react dia\n`, d.f1('AFK...', ''), d.f2(m.pushName, pp, q.home))
	conn.db.data.user[m.sender].afk = new Date*1
	conn.db.data.user[m.sender].rafk = [teks]
	conn.db.data.user[m.sender].bool = true
}