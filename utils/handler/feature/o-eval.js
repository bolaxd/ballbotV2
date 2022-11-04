import { format } from 'util';

export const handle = async(m, { q, d, conn, grup, findAdmin, bb, budy, meta, members, admins, isAdmin, isBotAdmin, bot, mime, quoted, quotry }) => {
	if (!m.isOwn) return
	try {
		let evaling = await eval(`(async () => { return ${m.query ? m.query : innalillahi_wainna_ilaihi_rojiuun } })()`)
		conn.sendteks(m.chat, format(evaling), m)
	} catch(e) {
		conn.sendteks(m.chat, await format(e) + '\n\n*Anda Sepertinya Harus banyak belajar bangg*\n*Jangan Asal tempel code*', d.f1(e, ''))
	}
}