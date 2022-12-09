
const handle = async (m, { q, conn, d, bb, getpp, bot, more, db }) => {
	const getmenu = (nama, ciri) => {
		let teks = '\n'+q.sub(nama)+'\n'
		teks += db.cmd.filter(i=>i[1].startsWith(ciri)).map(v=> q.cmd(bb(m.preff+v[0]))).sort().join('\n')
		teks += '\n'
		return teks
	}
	let i = db.set.findIndex(v => v[0] == bot)
	let category = [...new Set(db.cmd.map(v => v[1].split('/')[0]))]
	if (m.command.startsWith('menu') && m.command.length >4 && category.includes(m.command.split('menu')[1]) && db.set[i][1].setmenu == 'simple') {
		conn.sendteks(m.chat, getmenu(m.command.split('menu')[1].toUpperCase(), m.command.split('menu')[1].toLowerCase()), d.f1('Simple menu :v',''), d.f2('Github:me',await getpp(m.sender), q.home))
	}
}

export default handle;
