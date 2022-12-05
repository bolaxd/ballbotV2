import { googleImage } from '@bochilteam/scraper'

const handle = async (m, { q, d, conn, repl }) => {
	if (!m.query) return repl(q.query)
	await repl(q.wait, m)
	if (m.args[0] == 'hoyo') {
		conn.sendimg(m.chat, m.args[1], q.sukses, m)
	} else {
		let search = 'https://google.com/search?q=' + (encodeURIComponent(m.query))
		let res = await googleImage(search).catch(e=> q.gagal)
		let list = res.length !== 0 ? res.map(v=> [`Link => ${v}`, `.gimage hoyo ${v}`, '']) : [['Result tidak ditemukan!', '', `By : ${q.name}`]]
		conn.sendlist(m.chat, `Hasil dari query: ${m.query}\nTotal: ${res.length}\n`, `Google search image by : ${q.name}`, list, m)
	}
};

export default handle;