import fs from 'fs';

let folder = `TMP/db-bot${Date.now()}`
const handle = async(m, { q, conn, mulai, repl, db, bot }) => {
repl('Tunggu sebentar.. meload QR')
let listjadibot = conn.readjson('./utils/db/jadibot.json')
		listjadibot.push({ date: Date.now(), db: mulai(conn, q, m, db, folder), id: null, folder })      
		conn.writejson('./utils/db/jadibot.json', listjadibot)
}

export default handle;