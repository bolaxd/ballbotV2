import { imgToStiker, vidToStiker } from '../../util/convert-media.js';

export const handle = async (m, { q, conn, d, quoted, mime }) => {
	let teks = 'reply foto / kirim foto dengan caption .stiker';
	if (!quoted) return conn.sendteks(m.chat, teks,m);
	let pack = `hohoii, ini punya bolaxd cuyy`;
	if (!/(image|video|webp)/.test(mime)) return conn.sendteks(m.chat, teks, m);
	let buf = await quoted.download();
	if (/image/.test(mime)) conn.sendstik(m.chat, await imgToStiker(buf, {name: pack, author: q.name}), m, d.f2('',q.thumb2,''))
	else if (/video/.test(mime)) conn.sendstik(m.chat, await vidToStiker(buf, {name: pack, author: q.name}), m, d.f2('',q.thumb2,''))
};
