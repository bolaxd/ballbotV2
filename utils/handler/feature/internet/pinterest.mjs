import { pinterest } from '@bochilteam/scraper';

const handle = async (m, { q, conn, repl }) => {
		if (!m.query) return repl(q.query)
		await repl(q.wait)
		if (m.args[0] == 'ew3') {
			conn.sendimg(m.chat, m.args[1], q.sukses, m)
		} else {
			let res = await pinterest(m.query).catch(_=> _);
			let list = []
			for (let u of res) list.push(['Link => '+u, `.pinterest ew3 ${u}`, ''])
			list.push([`By: ${q.name}`, '', ''])
			conn.sendlist(m.chat, `Hasil dari query: ${m.query}\nTotal: ${res.length}\n`, `Pinterest search image by : ${q.name}`, list, m)
		}
};

export default handle;