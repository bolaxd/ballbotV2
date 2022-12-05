import simi from 'similarity';
let sensitive = 0.75
const handle = async (m, { q, conn, bb, budy, repl }) => {
	let i = m.chat
	conn.susunkata = conn.susunkata ? conn.susunkata : {}
	if (i in conn.susunkata) {
		if (simi(conn.susunkata[i][2], budy.toLowerCase()) >= sensitive) {
			repl(i, `Jawaban benarr!!!\n\nSoalan:\n${bb(conn.susunkata[i][1])}\nJawaban : ${conn.susunkata[i][2]}`)
			clearTimeout(conn.susunkata[i][3])
			delete conn.susunkata[i]
		}
	}
}

export default handle;