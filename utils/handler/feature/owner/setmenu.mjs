const handle = async (m, { q, conn, db, repl }) => {
	if (!m.isOwn) return repl(q.owner)
	if (m.args[0] == 'list') {
		db.set[i][1].setmenu = 'list'
		repl('Sukse mengubah menu menjadi list')
	} else if (m.args[0] == 'simple') {
		db.set[i][1].setmenu = 'simple'
		repl('Sukse mengubah menu menjadi simple')
	} else if (m.args[0] == 'all') {
		db.set[i][1].setmenu = 'all'
		repl('Sukse mengubah menu menjadi all')
	} else {
		let list = [
			['Simple', `.${m.command} simple`,''],
			['All', `.${m.command} all`,''],
			['List', `.${m.command} list`,''],
		]
		conn.sendlist(m.chat, `Menu sekarang terset pada : ${db.set[i][1].setmenu}\n`, `Silahkan mengganti nya dibawah!\n${q.name}`, list, m)
	}
};

export default handle;
