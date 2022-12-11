import fs from 'fs';

const handle = async (m, { q, conn, db, repl }) => {
	if (!conn.conn2[m.sender]) return repl('Mulai QR bot dengan command .startqr');
	try {
		let conn2 = conn.conn2[m.sender]
		conn2.logout()
		fs.rmSync(conn2.folder, { recursive: true, force: true })
		delete conn.conn2[m.sender]
		repl('QR telah berhenti!')
	} catch(e) {
		repl('Maaf error!, Report Owner untuk kesalahan ini!')
	}
}

export default handle;