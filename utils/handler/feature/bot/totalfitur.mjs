import fs from 'fs';

const json = JSON.parse(fs.readFileSync('./utils/handler/feature/listcmd.json'));

const handle = async (m, { q, conn, d, bb, getpp, more }) => {
	let teks = q.tit('TOTAL FITUR BOT')+'\n\n'
		teks += `Terdapat : ${json.length}`
	conn.sendteks(m.chat, teks, d.f1('Simple menu :v',''), d.f2('Github:me',await getpp(m.sender), q.home))
}

export default handle;
