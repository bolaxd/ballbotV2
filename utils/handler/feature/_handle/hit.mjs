
const handle = async (m, { q, conn, bot, db }) => {
	let find = db.cmd.findIndex(v=> v[0] == m.command.toLowerCase())
	if (find !== -1) {
		db.cmd[find][2][11] = Date.now();
		db.cmd[find][2][10]++
		conn.writejson(q.jsoncmd, db.cmd)
		// 1670022284509
	}
}

export default handle;