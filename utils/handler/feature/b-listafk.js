export const handle = async (m, { q, conn, d, bb }) => {
	let all = Object.keys(conn.db.data.user).filter(v=>conn.db.data.user[v].bool)
	let teks = bb('===== [ LIST AFK ] =====\n\n')
		 teks += `Total: ${all.length}\n`
	for (let u of all) teks+= `wa.me/${u.split('@')[0]}\n`
	conn.sendteks(m.chat, teks, d.f1('LIST AFK USER...', ''))
}