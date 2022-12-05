import { toVid, toVid2, toJpg } from '../../../util/convert-media.js';

const handle = async (m, { q, d, conn, mime, quoted, repl }) => {
	if (!m.quoted) return repl('reply stiker nya');
	if (!/webp/.test(mime)) return repl('Reply stiker jangan selain stiker');
	let path = await quoted.download()
	if (m.quoted.isAnimated == true) {
		let b = await toVid2(path)
			conn.sendvid(m.chat, b, q.sukses, m)
	} else if (m.quoted.isAnimated == false) {
		conn.sendimgbuf(m.chat, await toJpg(path), q.sukses, m)
	}
}

export default handle;
