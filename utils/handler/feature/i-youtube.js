import { youtubeSearch } from '@bochilteam/scraper';

export const handle = async (m, { q, d, conn, bb }) => {
	try {
		if (!m.query) throw q.query
		await conn.sendteks(m.chat, q.wait, m)
		if (m.args[0] == 'datasheet234') {
			let but = [
				['Video', `.hehe ${m.args[1]}`],
				['Dokument', `.hehe ${m.args[1]}`],
				['Music', `.hehe ${m.args[1]}`],
			]
			conn.butteks(m.chat, "Silahkan Pilih Opsi Download Dibawah...", `Youtube Search by: ${q.name}`, but, m, d.f2('Youtube', m.args[2], m.args[1]))
		} else {
			let res = await youtubeSearch(m.query)
			let isi = res.video.map(i=> [
				i.title ? i.title : 'Tidak terdeteksi',
				`.youtube datasheet234 ${i.url ? i.url : 'noll'} ${i.thumbnail ? i.thumbnail : 'noll'}`,
				`diterbitkan : ${!i.publishedTime ? 'Tidak terdeteksi': i.publishedTime}	|	`
				+`views : ${!i.viewH ? 'Tidak terdeteksi': i.viewH}	|	`
				+`durasi : ${!i.durationH ? 'Tidak terdeteksi' : i.durationH}	|	`
				+`channel : ${!i.authorName ? 'Tidak terdeteksi': i.authorName}\n\n`
				+`desc : ${!i.description ? 'Tidak terdeteksi' :i.description}\n\n`
				+`link : ${!i.url ? 'Tidak terdeteksi': i.url}\n\n`
				])
				if (!res.video) isi.push([`Youtube Search by: bolaxd`, `hoho`, ''])
			conn.sendlist(m.chat, `Pencarian Ditemukan....\nTerdapat = ${res.video.length} Dalam mesin pencarian youtube dari kata kunci ${m.query}`, q.name, isi, m)
		}
	} catch (e) { conn.sendteks(m.chat, e, m) }
}