import { toUrl, toJpg, imgToStiker } from '../../../util/convert-media.js';

let baseUrl = `https://api.memegen.link/images/custom/${encodeURIComponent('')}/${encodeURIComponent(atas)}.png?background=`

const handle = async (m, { q, conn, mime, quoted, repl }) => {
	let [atas, bawah] = m.query.split('|' || ',' || '+')
	if (!/(webp|image)/.test(mime)) return repl(`Balas stiker dengan teks *.${m.command} teks kesatu , teks kedua*\nAtau Balas gambar / kirim gambar dengan caption *.${m.command} teks kesatu , teks kedua*`);
	let dl = await quoted.download()
	if (/webp/.test(mime)) {
		
	} else repl(`Balas stiker dengan teks *.${m.command} teks kesatu , teks kedua*\nAtau Balas gambar / kirim gambar dengan caption *.${m.command} teks kesatu , teks kedua*`)
}

export default handle;