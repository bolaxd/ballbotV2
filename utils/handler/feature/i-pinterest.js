import { pinterest } from '@bochilteam/scraper';

export const handle = async (m, { q, conn }) => {
	try {
		if (!m.query) throw q.query
		await conn.sendteks(m.chat, q.wait, m)
		if (m.args[0] == 'ew3') {
			conn.sendimg(m.chat, m.args[1], q.sukses, m)
		} else {
			let res = await pinterest(m.query).catch(_=> q.gagal);
			let list = []
			for (let u of res) list.push(['Link => '+u, `.pinterest ew3 ${u}`, ''])
			list.push([`By: ${q.name}`, '', ''])
			conn.sendlist(m.chat, `Hasil dari query: ${m.query}\nTotal: ${res.length}\n`, `Pinterest search image by : ${q.name}`, list, m)
		}
	} catch (e) { conn.sendteks(m.chat, e, m) }
}