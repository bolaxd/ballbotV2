const handle = async (m, { q, d, conn }) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	if (!(m.quoted ? m.quoted : m)) return conn.sendteks(m.chat, q.forteks, m)
	let all = Object.keys(await conn.groupFetchAllParticipating());
	conn.sendteks(m.chat, `Sedang mengirim Broadcast ke grup ${all.length} selama ${q.longbc*all.length/1000} detik`, m)
	let teks = m.quoted ? '```♠  BROADCAST MESSAGE  ♠```\n\n'+m.quoted.text : '```🫀   BROADCAST MESSAGE  🫀```\n\n'+m.query
	let but = [
			['Hoho', '.menu'],
		]
	for (let i of all) {
		await q.delay(q.longbc)
		await conn.butteks(i, teks, q.name, but, d.f1('Broadcast group', ''), d.f2('Github:me', q.thumb2, q.home))
	}
	conn.sendteks(m.chat, q.sukses, m)
};

export default handle;