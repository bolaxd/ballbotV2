import { toVid, toJpg } from '../../util/convert-media.js';

export const handle = async (m, { q, d, conn, mime, quoted }) => {
	if (!m.quoted) return conn.sendteks(m.chat,'reply stiker nya',m);
	if (!/webp/.test(mime)) return conn.sendteks(m.chat,'Reply stiker jangan selain stiker',m);
	let path = await quoted.download()
	if (m.quoted.isAnimated == true) {
		conn.sendvidbuf(m.chat, await toVid(path), q.sukses, m)
	} else if (m.quoted.isAnimated == false) {
		conn.sendimgbuf(m.chat, await toJpg(path), q.sukses, m)
	}
}
