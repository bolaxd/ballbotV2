export const handle = async (m, { q, conn }) => {
	let teks = `Group Ballbot whatsapp\n\n`
	let p = 1
	for (let u of q.gcbot) {
		let result = await conn.groupInviteCode(u)
		teks += `group ${p++}\n`
		teks += `https://chat.whatsapp.com/${result}`
	}
	conn.sendteks(m.chat, teks, m)
}