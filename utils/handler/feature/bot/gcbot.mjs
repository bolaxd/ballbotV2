const handle = async (m, { q, conn, bot, repl }) => {
	// let info = q.gcbot.map(async v => await conn.groupGetInviteInfo(v).then(_=> _.participants))
	// console.log(info);
	// if (!info.map(v=>v.id).includes(bot)) return repl(`Maaf !!!\nBot tidak join di gc tersebut\nJadi tidak dapat mengambil link`)
	let teks = `Group Ballbot whatsapp\n`
	let p = 1
	for (let u of q.gcbot) {
		let result = await conn.groupInviteCode(u)
		teks += `\n`
		teks += `https://chat.whatsapp.com/HV8JID9hBhsD6ogvpKLMg8\n\n`
	}
	repl(teks)
}

export default handle;