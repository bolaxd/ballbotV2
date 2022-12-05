
const handle = async(m, { q, d, conn, bot, isBotAdmin, db }) => {
	if (!m.isGc) return
	let i = db.set.findIndex((v) => v[0] == bot);
	if (db.set[i][1].antitag) {
		let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : []), ...(m.react ? [m.rtarget] : [])])]
		for (let u of jids) {
			if (m.fromMe) continue
			if (m.isOwn) continue
			if (!q.developer.map(v=>v + q.idwa).includes(u)) continue
			if (isBotAdmin) await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} });
			conn.sendteks(m.chat, `Jangan Tag Owner!!! ${m.react ? '@'+m.sender.split('@')[0] : ''}\n\nOwner Mode anti tag`, m, {mentions: [m.sender]});
		}
	}
};

export default handle;