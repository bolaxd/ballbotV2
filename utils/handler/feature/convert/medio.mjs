import { toVid, toVid2, toJpg } from '../../../util/convert-media.mjs';

const handle = async (m, { q, d, conn, mime, quoted, repl, db, bot }) => {
	if (!m.quoted) return repl('reply stiker nya');
	if (!/webp/.test(mime)) return repl('Reply stiker jangan selain stiker');
	let path = await quoted.download()
	let i = db.set.findIndex(v=> v[0] == bot)
	if (m.quoted.isAnimated == true) {
		let b = await toVid2(path, {name: db.set[i][1].pack, author: db.set[i][1].auth})
			conn.sendvid(m.chat, b, q.sukses, m)
	} else if (m.quoted.isAnimated == false) {
		conn.sendimgbuf(m.chat, await toJpg(path, {name: db.set[i][1].pack, author: db.set[i][1].auth}), q.sukses, m)
	}
}

export default handle;