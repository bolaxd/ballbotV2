import { googleImage } from '@bochilteam/scraper'
export const handle = async (m, { q, d, conn }) => {
	try {
		if (!m.query) throw q.query;
		await conn.sendteks(m.chat, q.wait, m)
		if (m.args[0] == 'hoyo') {
			conn.sendimg(m.chat, m.args[1], q.sukses, m)
		} else {
			let search = 'https://google.com/search?q=' + (encodeURIComponent(m.query))
			let res = await googleImage(search).catch(e=> q.gagal)
			let list = []
			for (let u of res) list.push(['Link => '+u, `.gimage hoyo ${u}`, ''])
			list.push([`By: ${q.name}`, '', ''])
			conn.sendlist(m.chat, `Hasil dari query: ${m.query}\nTotal: ${res.length}\n`, `Google search image by : ${q.name}`, list, m)
		}
		
	} catch (e) { conn.sendteks(m.chat, e, m) }
}