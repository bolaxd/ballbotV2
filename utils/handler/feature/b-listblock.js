export const handle = async (m, { q, d, conn, lblock }) => {
	let teks = '====[  LIST BLOCKED  ]====\n\n'
		 teks += `Total: ${lblock.length}\n`
	for (let u of lblock) teks += `wa.me/${u.split('@')[0]}\n`
	let but = [
			['Minta unblock', '.owner'],
		]
	conn.butteks(m.chat, teks, q.name, but, d.f1('List block bot', ''))
}