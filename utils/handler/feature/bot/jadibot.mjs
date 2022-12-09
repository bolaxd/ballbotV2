import fs from 'fs';

let folder = `TMP/db-bot${Date.now()}`
const handle = async(m, { q, conn, mulai, repl, db, bot }) => {
repl('Tunggu sebentar.. meload QR')
let listjb = conn.readjson('./utils/db/jadibot.json')
		listjb.push({ date: Date.now(), db: null, id: null, folder })
		mulai(conn, q, m, db, folder)
		conn.writejson('./utils/db/jadibot.json', listjb)
}

export default handle;