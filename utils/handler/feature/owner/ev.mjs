import { format, inspect } from 'util';
import axios from 'axios';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

const handle = async(m, { conn, q, d, grup, findAdmin, bb, budy, meta, members, admins, isAdmin, isBotAdmin, bot, mime, quoted, quotry, cache, db }) => {
	if (!m.isOwn) return
	try {
		let evaling = await eval(!m.query ? Innalillahi_wainna_lillahi_rojiun:m.query)
		conn.sendteks(m.chat, typeof evaling != 'string' ? inspect(evaling) : format(evaling), m)
	} catch(e) {
		conn.sendteks(m.chat, await format(e) + '\n\n*Anda Sepertinya Harus banyak belajar bangg*\n*Jangan Asal tempel code*', d.f1(e, ''))
	}
};

export default handle;