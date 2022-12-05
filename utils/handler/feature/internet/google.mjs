import { googleIt } from '@bochilteam/scraper';

const handle = async (m, { q, conn, repl }) => {
	if (!m.query) return repl(q.query)
	await repl(q.wait)
	let search = 'https://google.com/search?q='+(encodeURIComponent(m.query))
	let res = await googleIt(search)
	let list = res.length !== 0 ? res.articles.map(v=> [v.title+'\n', '', v.description+'\n\n'+v.url]) : [['Result tidak ditemukan!','',`By : ${q.name}`]]
	conn.sendlist(m.chat, `SEARCH GOOGLE\n\nDari Hasil yang kami dapat dari query : ${m.query}\nTotal: ${res.articles.length} result`, `google searching by : ${q.name}`, list, m)
};

export default handle;