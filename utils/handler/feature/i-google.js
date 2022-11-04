import { googleIt } from '@bochilteam/scraper';
export const handle = async (m, { q, conn }) => {
	try {
		if (!m.query) throw q.query;
		await conn.sendteks(m.chat, q.wait, m)
		let list = []
		let search = 'https://google.com/search?q='+(encodeURIComponent(m.query))
		let res = await googleIt(search)
		for (let u of res.articles) list.push([u.title+'\n', ``, u.description+'\n\n'+u.url])
		list.push([`By: ${q.name}`, '', ''])
		conn.sendlist(m.chat, `SEARCH GOOGLE\n\nDari Hasil yang kami dapat dari query : ${m.query}\nTotal: ${res.articles.length} result`, `google searching by : ${q.name}`, list, m)
	} catch (e) { conn.sendteks(m.chat, e, m) }
}