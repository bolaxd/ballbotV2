import { format, inspect } from 'util';
import * as tsEval from 'ts-eval';

const handle = async(m, { conn, q, d, grup, findAdmin, bb, budy, meta, members, admins, isAdmin, isBotAdmin, bot, mime, quoted, quotry }) => {
	if (!m.isOwn) return
	try {
		let evaling = await eval(tsEval.transpileEval(!m.query ? Innalillahi_wainna_lillahi_rojiun:m.query))
		conn.sendteks(m.chat, typeof evaling != 'string' ? inspect(evaling) : format(evaling), m)
	} catch(e) {
		conn.sendteks(m.chat, await format(e) + '\n\n*Bahasa Typescript cuma git gitu doang bang :v*\n*Salah kek gini malu²in gw developer : bolaxd*', d.f1(e, ''))
	}
};

export default handle;