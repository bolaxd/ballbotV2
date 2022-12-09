const { default: A, DisconnectReason, useMultiFileAuthState } = (await import('baileys')).default;
import ws from 'ws';
import qrcd from 'qrcode';
import fs from 'fs';
import bind from './serve.mjs';
import { configConnectionJadibot, store } from '../config-connection.mjs';
import msgUp from '../handler/msg-upsert.mjs';
var listjb = JSON.parse(fs.readFileSync('./utils/db/jadibot.json'))
const bebek = async (m, u, conn, q, kontol, conn2, db, fold) => {
	let { lastDisconnect, connection, qr } = u
let i = listjb.findIndex(v => v.folder == fold)
	if (qr) {
		let scanner = await conn.sendimgbuf(m.chat, Buffer.from((await qrcd.toDataURL(qr, { scale: 8 })).split(',')[1], 'base64'), `Silahkan Scan QR Code ini!!!\nWaktu scan Cuma ${q.longqr/1000} detik...\n\n`, m);
		setTimeout(async () => {
			await conn.sendMessage(m.chat, { delete: scanner.key });
		}, q.longqr);
	}
	if (connection == 'open') {
		let noUser = conn2.createJid(conn2.user.id)
		conn.sendteks(m.chat, `@${noUser.split('@')[0]} Telah tersambung ke server ${q.name}...`, m);
		listjb[i].id = noUser
		conn.writejson('./utils/db/jadibot.json', listjb)
	} else if (connection == 'close') {
 
		mulai(conn, q, m, db, fold)
		conn.sendteks(m.chat, `Menghubungkan ke session...`, m);
	}
}

let mulai = async (conn, q, m, db, fold) => {
	const { state, saveCreds } = await useMultiFileAuthState(fold);
	const conn2 = A(Object.assign(configConnectionJadibot, { auth: state }));
	let i = listjb.findIndex(v => v.folder == fold)
	bind(conn2)
	store.bind(conn2.ev);
	conn2.ev.on('connection.update', async (u) => bebek(m, u, conn, q, mulai, conn2, db, fold));
	conn2.ev.on('messages.upsert', async (u) => {
        await q.delay(1000)
        msgUp(u, conn2, store, db, q)
	});
	conn2.ev.on('creds.update', saveCreds);
listjb[i].db = conn2
		conn.writejson('./utils/db/jadibot.json', listjb)
	return conn2;
}

export { mulai, bebek }