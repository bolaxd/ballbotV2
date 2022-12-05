
const handle = async(m, { q, conn, db }) => {
	let i = db.users.findIndex(v=> v[0] == m.sender)
 	if (db.users[i][1].lastafk > -1) {
		conn.sendteks(m.chat,`Kamu berhenti afk...\nSetelah alasan : ${db.users[i][1].reason}\nSelama : ${(Date.now()- db.users[i][1].lastafk).timers()}`, m);
		db.users[i][1].lastafk = -1
		db.users[i][1].reason = null
		conn.writejson(q.jsonuser, db.users)
 	}
		let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : []), ...(m.react ? [m.rtarget] : [])])]
		for (let u of jids) {
			let _k = db.users.findIndex(v=> v[0] == u)
			if (!db.users[_k]) continue
			if (!db.users[_k] || db.users[_k][1].lastafk < 0) continue
			if (m.fromMe) continue
			conn.sendteks(m.chat, `Ssstt ${m.react ? '@'+m.sender.split('@')[0] : ''}, orang nya sedang afk...\n Kamu jangan tag dia!!!\nJangan react Dia!!!\nJangan Reply Dia!!!\nDia afk sejak : ${(new Date - db.users[_k][1].lastafk).timers()} yang lalu\nDengan alasan : ${db.users[_k][1].reason}`, m, {mentions: [m.sender]})
		}
};

export default handle;