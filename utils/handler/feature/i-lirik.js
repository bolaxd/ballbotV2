import { lyrics, lyricsv2 } from '@bochilteam/scraper';
export const handle = async (m, { q, conn, d }) => {
	try {
		if (!m.query) throw 'Masukan Judul lagu nya setelah command';
		await conn.sendteks(m.chat, q.wait, m)
		let res = await lyricsv2(m.query).catch(e=> lyrics(m.query)).catch(_=> q.gagal)
		// console.log(res);
		conn.sendteks(m.chat, `Judul: *${res.title}*\n\n${res.lyrics}\n\nSumber: ${res.link}`, d.f1('Searching...', ''))
	} catch (e) { conn.sendteks(m.chat, e, m) }
}