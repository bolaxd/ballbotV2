import { stickerTelegram } from '@bochilteam/scraper';

const handle = async (m, { q, conn }) => {
	let res = await stickerTelegram(m.query ? m.query : 'patrick')
	// console.log(res);
	let list = res.length >0 ? res.map(v=> [v.title, `.downimg ${v.stickers.join(' ')}`, `Paket ini terdapat : ${v.stickers.length} Stiker didalam nya | Link : ${v.link}`]) : [['by bolaxd','','']]
	conn.sendlist(m.chat, `Terdapat ${res.length} hasil dari pencarian query : ${m.query}`, q.name, list, m)
};

export default handle;