
const handle = async(m, { q, conn, conn2, repl }) => {
   // if (conn.user.jid !== conn2.user.jid) return repl(`Anda tidak bisa membuat bot didalam jadi bot!1!`);
	let user = m.sender
    conn.jadibot = conn.jadibot ? conn.jadibot : {}
    conn.jadibot[user] = [
		await repl(`Tunggu sebentar!!!\nSedang meload QR code`),
		await conn2(user, conn, q, m, true)
	]
}

export default handle;