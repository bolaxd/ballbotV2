import { chord } from '@bochilteam/scraper';

export const handle = async (m, { q, d, conn }) => {
	try {
		if (!m.query) throw q.query
		await conn.sendteks(m.chat, q.wait, m)
		let res = await chord(m.query)
		conn.sendteks(m.chat, `Judul: ${res.title}\nArtis: ${res.artist}\n\n${res.chord}\n\nSumber: ${res.url}`, d.f1('SEARCH CHORD GITAR...', ''));
	} catch (e) { conn.sendteks(m.chat, e, m) }
}