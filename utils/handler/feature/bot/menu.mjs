import fs from 'fs';

const handle = async (m, { q, conn, d, bb, getpp, bot, more, db }) => {
	const getmenu = (nama, ciri) => {
		let teks = '\n'+q.sub(nama)+'\n'
		teks += db.cmd.filter(i=>i[1].startsWith(ciri)).map(v=> q.cmd(bb(m.preff+v[0]))).sort().join('\n')
		teks += '\n'
		return teks
	}
	let k = db.set.findIndex((v) => v[0] == bot)
	let _a = 0, _b = 0, _c = `./${q.session}/`;
	let dir = fs.readdirSync(_c)
	let size = dir.map(v=> _b += (fs.statSync(_c+v)).size)
	let _e = db.cmd.map(v=> _a += v[2][10]), _f = db.cmd.map(v=> v[2][10]).sort((a, b) => b-a)
	let result = _f.concat(_f).slice(0, 5).map(c=> db.cmd.find(v=> c == v[2][10]));
	let menu2 = `*INFO BOT*\n\n`
 				 + `Ram Used Bot : ${process.memoryUsage.rss().sizeString()}\n`
 				 + `System OS : ${process.platform}\n`
 				 + `Nodejs Version : ${process.version}\n`
 				 + `Max Ram Server : ${process.env.SERVER_MEMORY??0} MB\n`
 				 + `Time server : ${process.env.TZ??'Tidak diketahui'}\n`
 				 + `Location Server : ${process.env.P_SERVER_LOCATION??'tidak diketahui'}\n`
				 + `\nStarting Bot : ${(process.uptime() * 1000).timers()}\n`
				 + `Total Sessions : ${dir.length} Files\n`
				 + `Size All sessions : ${_b.sizeString()}\n`
				 + `Total Database user : ${db.users.length} Users\n`
				 + `Total Database group : ${db.grup.length} groups\n`
				 + `Total Command : ${db.cmd.length} command\n`
				 + `Total hit : ${_a}\n`
				 + `Top command :\n${result.map((v, i)=> `${i + 1}. ${m.preff + v[0]}\nHit: ${v[2][10]}`).join('\n')}`
	let menu1 = q.tit('ALL MENU')+'\n\n'
				 + menu2 + '\n' + more
				 + getmenu('BOT', 'bot')
				 + getmenu('FUN', 'fun')
				 + getmenu('GAME', 'game')
				 + getmenu('GROUP', 'group')
				 + getmenu('CONVERT', 'convert')
				 + getmenu('INTERNET', 'internet')
				 + getmenu('DATABASE', 'database')
				 + getmenu('STALK', 'stalk')
				 + getmenu('MAKER', 'maker')
				 + getmenu('NEWS', 'news')
				 + more + '\n'
				 + getmenu('OWNER', 'owner')
				 
	let category = [...new Set(db.cmd.map(v => v[1].split('/')[0]))]
	let menu3 = q.tit('SIMPLE MENU') + '\n\n'
				 + menu2 + '\n' + more
				 + '\n' + q.sub('SIMPLE') + '\n'
				 + category.map(v => q.cmd(bb(m.preff+'menu'+v))).join('\n')
	let list = category.map(v => [`シ ${v}`, `.${m.command} ${v}`, ''])
	
	if (db.cmd.findIndex(v => v[1].split('/')[0] == m.args[0]) > -1) {
		conn.sendteks(m.chat, getmenu(m.args[0].toUpperCase(), m.args[0].toLowerCase()), d.f1('Simple menu :v',''), d.f2('Github:me',await getpp(m.sender), q.home))
	} else {
		// MENU ALL
		// conn.sendteks(m.chat, menu1, d.f1('Simple menu :v',''), d.f2('Github:me',await getpp(m.sender), q.home))
		// MENU LIST
		conn.sendlist(m.chat, q.tit('LIST MENU')+'\n\n' + menu2, q.name, list, m)
		// MENU SIMPLE
		//conn.sendteks(m.chat, menu3, d.f1('Simple menu :v',''), d.f2('Github:me',await getpp(m.sender), q.home))
	}
}

export default handle;