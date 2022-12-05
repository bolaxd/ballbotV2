import fs from 'fs';

const handle = async (m, { q, conn, d }) => {
	let all = await fs.readdirSync('./TMP')
	let teks = q.tit('Jumlah Sampah system')+'\n\n'
	teks += `Total : ${all.filter(v=>v.endsWith('.tmp')).map(v=>v).length} Sampah\n\n`
	teks += all.filter(v=>v.endsWith('.tmp')).map(o=>`~${o}~\n`).join("");
	conn.sendteks(m.chat, teks, m, d.f2(q.name, q.thumb2, q.home))
}

export default handle;