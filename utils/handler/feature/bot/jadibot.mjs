const { default: A, DisconnectReason, useMultiFileAuthState } = (await import('baileys')).default;
import ws from 'ws';
import qrcd from 'qrcode';
import fs from 'fs';
import { configConnectionJadibot, store } from '../../../config-connection.mjs';
import bind from '../../../util/serve.mjs';
import msgUp from '../../msg-upsert.mjs';
var listjb = JSON.parse(fs.readFileSync('./utils/db/jadibot.json'))

let fold = `TMP/db-bot${Date.now()}`

const handle = async(m, { q, conn, mulai, repl, db, bot }) => {
	conn.conn2 = conn.conn2 ? conn.conn2 : {}
	if (conn.conn2[m.sender] && conn.conn2[m.sender] !== conn.user.id) return repl('Tidak bisa mrmbuat bot didalam jadibot...')
	const { state, saveCreds } = await useMultiFileAuthState(fold);
	repl('Tunggu sebentar.. meload QR')
	conn.conn2[m.sender] = A(Object.assign(configConnectionJadibot, { auth: state }));
	let conn2 = conn.conn2[m.sender]	
	bind(conn2)
	store.bind(conn2.ev)
	conn2.ev.on('connection.update', async ({ lastDisconnect, connection, qr }) => {
		if (qr) {
			let scanner = await conn.sendimgbuf(m.chat, Buffer.from((await qrcd.toDataURL(qr, { scale: 8 })).split(',')[1], 'base64'), `Silahkan Scan QR Code ini!!!\nWaktu scan Cuma ${q.longqr/1000} detik...\n\n`, m);
			setTimeout(async () => {
				await conn.sendMessage(m.chat, { delete: scanner.key });
			}, q.longqr);
		}
		if (connection == 'open') {
		let noUser = conn2.createJid(conn2.user.id)
		conn.sendteks(m.chat, `@${noUser.split('@')[0]} Telah tersambung ke server ${q.name}...`, m);
	} else if (connection == 'close') {
		conn.sendteks(m.chat, `Koneksi terputus...`, m);
		delete conn.conn2[m.sender]
		
	}
	});
	conn2.ev.on('messages.upsert', async (u) => {
        await q.delay(1000)
        msgUp(u, conn2, store, db, q)
	});
	conn2.ev.on('creds.update', saveCreds);
}

export default handle;