import fs from 'fs';

const handle = async (m, { q, conn, db, repl }) => {
	if (!conn.conn2[m.sender]) return repl('Mulai QR bot dengan command .startqr');
	let conn2 = conn.conn2[m.sender]
	conn2.logout()
	fs.rmSync(conn2.folder, { recursive: true, force: true })
	delete conn.conn2[m.sender]
	repl('QR telah berhenti!')
}

export default handle;