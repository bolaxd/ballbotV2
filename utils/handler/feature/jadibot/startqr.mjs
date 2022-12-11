const { default: A, DisconnectReason, useMultiFileAuthState } = (await import('baileys')).default;
import ws from 'ws';
import qrcd from 'qrcode';
import fs from 'fs';
import { configConnectionJadibot, store } from '../../../config-connection.mjs';
import bind from '../../../util/serve.mjs';
import msgUp from '../../msg-upsert.mjs';

var listjb = JSON.parse(fs.readFileSync('./utils/db/jadibot.json'))

const mulai = async function mulai(m, q, conn, fold) {
	const { state, saveCreds } = await useMultiFileAuthState(fold);
	conn.conn2[m.sender] = A(Object.assign(configConnectionJadibot, { auth: state }));
	conn.conn2[m.sender].folder = fold;
	let conn2 = conn.conn2[m.sender]	
	bind(conn2)
	store.bind(conn2.ev)
	conn2.ev.on('connection.update', async ({ lastDisconnect, connection, qr }) => {
		if (qr) {
			let scanner = await conn.sendimgbuf(m.chat, Buffer.from((await qrcd.toDataURL(qr, { scale: 8 })).split(',')[1], 'base64'), `Silahkan Scan QR Code ini!!!\nWaktu scan Cuma ${q.longqr/1000} detik...\nStop QR: .stopqr`, m);
			setTimeout(async () => {
				await conn.sendMessage(m.chat, { delete: scanner.key });
			}, q.longqr);
		}
		if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn2.ws.readyState !== ws.CONNECTING) {
			mulai(m, q, conn, fold)
			conn.sendteks(m.chat, `Menghubungkan...`, m);
		} else if (connection == 'open') {
			let noUser = conn2.createJid(conn2.user.id)
			conn.sendteks(m.chat, `@${noUser.split('@')[0]} Telah tersambung ke server ${q.name}...`, m);
			clearTimeout(conn.conn2[m.sender].timeout)
		} else if (connection == 'close') {
			conn.sendteks('Koneksi terputus...')
		}
	});
	conn2.ev.on('messages.upsert', async (u) => {
        await q.delay(1000)
        msgUp(u, conn.conn2[m.sender], store, q)
	});
	conn2.ev.on('creds.update', saveCreds);
	return conn2
}
const handle = async(m, { q, conn, repl, db, bot }) => {
if (!m.isOwn) return repl('Fitur ini perlu ijin owner')
	let fold = `TMP/db-bot${Date.now()}`
	conn.conn2 = conn.conn2 ? conn.conn2 : {}
	if (conn.conn2[m.sender] && conn.conn2[m.sender]?.user.id !== conn.user.id) return repl('Tidak bisa membuat bot didalam jadibot...')
	repl('Tunggu sebentar.. meload QR')
	mulai(m, q, conn, fold)
}

export default handle;