import simi from 'similarity';
let sensitive = 0.75
const handle = async (m, { q, conn, bb, budy, repl }) => {
	let i = m.chat
	conn.kata = conn.kata ? conn.kata : {}
	if (i in conn.kata) {
		if (simi(conn.kata[i][2], budy.toLowerCase()) >= sensitive) {
			repl(`Jawaban benarr!!!\n\nSoalan:\n${bb(conn.kata[i][1])}\nJawaban : ${conn.kata[i][2]}`)
			clearTimeout(conn.kata[i][3])
			delete conn.kata[i]
		}
	}
}

export default handle;