import fs from 'fs';

const handle = async (m, { q, conn, bot, repl, db }) => {
	let _a = 0, _b = 0, _c = `./${q.session}/`;
	let dir = fs.readdirSync(_c)
	let size = dir.map(v=> _b += (fs.statSync(_c+v)).size)
	let _e = db.cmd.map(v=> _a += v[2][10]), _f = db.cmd.map(v=> v[2][10]).sort((a, b) => b-a)
	let result = _f.concat(_f).slice(0, 5).map(c=> db.cmd.find(v=> c == v[2][10]));
	let teks = `DASHBOARD BOT\n\n`
				+ `Total Sessions : ${dir.length} Files\n`
				+ `Size All sessions : ${_b.sizeString()}\n`
				+ `Starting Bot : ${(process.uptime() * 1000).timers()}\n`
 				+ `System OS : ${process.platform}\n`
 				+ `Nodejs Version : ${process.version}\n`
 				+ `Ram Used Bot : ${process.memoryUsage.rss().sizeString()}\n`
 				+ `Max Ram Server : ${process.env.SERVER_MEMORY??0} MB\n`
 				+ `Time server : ${process.env.TZ??'Tidak diketahui'}\n`
 				+ `Location Server : ${process.env.P_SERVER_LOCATION??'tidak diketahui'}\n`
				+ `\nTotal hit : ${_a}\n`
				+ `Total Database user : ${db.users.length} Users\n`
				+ `Total Database group : ${db.grup.length} groups\n`
				+ `Total Command : ${db.cmd.length} command\n`
				+ `Top command :\n${result.map((v, i)=> `${i + 1}. ${m.preff + v[0]}\nHit: ${v[2][10]}`).join('\n')}`
	repl(teks)
}

export default handle;