import fs from 'fs';

const json = JSON.parse(fs.readFileSync('./utilss/handler/commands.json'));

export const handle = async (m, { q, conn, d, bb, getpp, more }) => {
	const getmenu = (nama, ciri, db) => {
		let teks = '\n'+q.sub(nama)+'\n'
		teks += db.filter(i=>i[1].startsWith(ciri)).map(v=> q.cmd(bb(m.preff+v[0]))+'\n').join('')
		teks += more
		return teks
	}
	let teks = q.tit('DAFTAR MENU')+'\n\n'
		teks += getmenu('BOT', 'b-', json[0])
		teks += getmenu('FUN', 'f-', json[0])
		teks += getmenu('GROUP', 'g-', json[0])
		teks += getmenu('CONVERT', 't-', json[0])
		teks += getmenu('INTERNET', 'i-', json[0])
		teks += getmenu('OWNER', 'o-', json[0])
	conn.sendteks(m.chat, teks, d.f1('Simple menu :v',''), d.f2('Github:me',await getpp(m.sender), q.home))
}
