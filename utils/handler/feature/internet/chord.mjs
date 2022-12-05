import { chord } from '@bochilteam/scraper';

const handle = async (m, { q, d, conn, repl }) => {
	if (!m.query) return repl(q.query)
	await repl(q.wait)
	let res = await chord(m.query)
	conn.sendteks(m.chat, `Judul: ${res.title}\nArtis: ${res.artist}\n\n${res.chord}\n\nSumber: ${res.url}`, d.f1('SEARCH CHORD GITAR...', ''));
};

export default handle;