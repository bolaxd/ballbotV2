import simi from 'similarity';
let sensitive = 0.75
const handle = async (m, { q, conn, bb, budy, repl }) => {
	let i = m.chat
	conn.caklontong = conn.caklontong ? conn.caklontong : {}
	if (i in conn.caklontong) {
		if (simi(conn.caklontong[i][2], budy.toLowerCase()) >= sensitive) {
			repl(`Jawaban benarr!!!\n\nSoalan:\n${bb(conn.caklontong[i][1])}\nJawaban : ${conn.caklontong[i][2]}`)
			clearTimeout(conn.caklontong[i][3])
			delete conn.caklontong[i]
		}
	}
}

export default handle;