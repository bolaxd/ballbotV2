let folder = `./TMP/db-bot${Date.now()}`
const handle = async(m, { q, conn, mulai, repl, db, bot }) => {
	let i = db.set.findIndex(v => v[0] == bot)
	let o = db.set[i][1].jadibot.findIndex(v => v.id == m.sender)
	if (o != -1) {
		await repl(`Tunggu...\nMenyambungkan ulang ke session`)
		await mulai(conn, q, m, db, db.set[i].jadibot.folder)
	} else {
		await repl(`Tunggu sebentar!!!\nSedang meload QR code`),
		await mulai(conn, q, m, db, folder)
	}
}

export default handle;