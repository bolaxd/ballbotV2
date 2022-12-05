const handle = async (m, { q, d, conn, lblock }) => {
	let teks = q.tit('LIST BLOCKED')+'\n\n'
		 teks += `Total: ${lblock.length}\n`
		 teks += lblock.map(u=>'wa.me/'+u.split('@')[0]).join('\n')
	let but = [
			['Minta unblock', '.owner'],
		]
	conn.butteks(m.chat, teks, q.name, but, d.f1('List block bot', ''))
}

export default handle;