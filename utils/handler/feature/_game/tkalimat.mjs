import simi from 'similarity';
let sensitive = 0.75
const handle = async (m, { q, conn, bb, budy, repl }) => {
	let i = m.chat
	conn.kalimat = conn.kalimat ? conn.kalimat : {}
	if (i in conn.kalimat) {
		if (simi(conn.kalimat[i][2], budy.toLowerCase()) >= sensitive) {
			repl(`Jawaban benarr!!!\n\nSoalan:\n${bb(conn.kalimat[i][1])}\nJawaban : ${conn.kalimat[i][2]}`)
			clearTimeout(conn.kalimat[i][3])
			delete conn.kalimat[i]
		}
	}
}

export default handle;