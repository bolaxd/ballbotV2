import simi from 'similarity';
let sensitive = 0.75
const handle = async (m, { q, conn, bb, budy, repl }) => {
	let i = m.chat
	conn.kimia = conn.kimia ? conn.kimia : {}
	if (i in conn.kimia) {
		if (simi(conn.kimia[i][2], budy.toLowerCase()) >= sensitive) {
			repl(`Jawaban benarr!!!\n\nSoalan:\n${bb(conn.kimia[i][1])}\nJawaban : ${conn.kimia[i][2]}`)
			clearTimeout(conn.kimia[i][3])
			delete conn.kimia[i]
		}
	}
}

export default handle;