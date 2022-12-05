import { lyrics, lyricsv2 } from '@bochilteam/scraper';

const handle = async (m, { q, conn, d, repl }) => {
	if (!m.query) return repl('Masukan Judul lagu nya setelah command')
	await repl(q.wait)
	let res = await lyricsv2(m.query).catch(e=> lyrics(m.query)).catch(_=> q.gagal)
	// console.log(res);
	conn.sendteks(m.chat, `Judul: *${res.title}*\n\n${res.lyrics}\n\nSumber: ${res.link}`, d.f1('Searching...', ''))
};

export default handle;