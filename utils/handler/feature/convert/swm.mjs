import { imgToStiker, wmSticker, vidToStiker } from '../../../util/convert-media.js';

const handle = async (m, { q, conn, mime, quoted, d, repl }) => {
	let teks = 'kirim gambar / video dengan caption .swm nama|pack-stiker\nAtau reply stiker dan balas lah dengan .swm nama|pack-stiker'
	let [t1, t2] = m.query.split('|');
	if (!t1) return repl(teks);
	if (!t2) return repl(teks);
	if (/webp/.test(mime)) {
		let dl = await m.quoted.download()
		let res = await wmSticker(dl, {name: t2, author: t1})
		conn.sendstik(m.chat, res, m, d.f2('', q.thumb2, ''))
	} else if (/video/.test(mime)) {
		let dl = await quoted.download()
		let res = await vidToStiker(dl, {name: t2, author: t1})
		conn.sendstik(m.chat, res, m, d.f2('', q.thumb2, ''))
	} else if (/image/.test(mime)) {
		let dl = await quoted.download()
		let res = await imgToStiker(dl, {name: t2, author: t1})
		conn.sendstik(m.chat, res, m, d.f2('', q.thumb2, ''))
	} else return repl(teks)
}

export default handle;