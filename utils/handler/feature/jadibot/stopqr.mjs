const handle = async (m, { q, conn, db, repl }) => {
if (!conn.conn2[m.sender]) return repl('Mulai QR bot dengan command .startqr');
try {
let conn2 = conn.conn2[m.sender]
conn2.logout()
repl('QR telah berhenti!')
} catch(e) {
repl('Maaf error!, Report Owner untuk kesalahan ini!')
}
}

export default handle;
