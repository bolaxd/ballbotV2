import simi from 'similarity';
let sensitive = 0.75
const handle = async (m, { q, conn, bb, budy, repl }) => {
	let i = m.chat
	conn.gambare = conn.gambare ? conn.gambare : {}
	if (i in conn.gambare) {
		if (simi(conn.gambare[i][1], budy.toLowerCase()) >= sensitive) {
			repl(`Jawaban benarr!!!\n\nJawaban : ${conn.gambare[i][1]}`)
			clearTimeout(conn.gambare[i][2])
			delete conn.gambare[i]
		}
	}
}

export default handle;