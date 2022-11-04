import fs from 'fs';

export const handle = async (m, { q, conn, d }) => {
	try {
		if (!m.isOwn) throw q.owner
		await conn.sendteks(m.chat,`sedang ambil...`,m)
		await conn.senddoclok(m.chat, `./${q.namedb}.json`, `${q.namedb}.json`, `application/json`, m)
	} catch (e) { conn.sendteks(m.chat, e, m) }
}
