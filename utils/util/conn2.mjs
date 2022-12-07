const { default: A, DisconnectReason, useMultiFileAuthState } = (await import('baileys')).default;
import ws from 'ws';
import qrcd from 'qrcode';
import bind from './serve.mjs';
import { configConnectionJadibot, store } from '../config-connection.mjs';
import msgUp from '../handler/msg-upsert.mjs';

let folder = `TMP/jadibot-${Date.now()}`
const bebek = async (m, u, conn, q, kontol, conn2, db, fold) => {
	let { lastDisconnect, connection, qr } = u
	if (qr) {
		let scanner = await conn.sendimgbuf(m.chat, Buffer.from((await qrcd.toDataURL(qr, { scale: 8 })).split(',')[1], 'base64'), `Silahkan Scan QR Code ini!!!\nWaktu scan Cuma ${q.longqr/1000} detik...\n\n`, m);
		setTimeout(async () => {
			await conn.sendMessage(m.chat, { delete: scanner.key });
		}, q.longqr);
	}
	if (connection == 'open') {
		let noUser = conn2.createJid(conn2.user.id)
		conn.sendteks(m.chat, `@${noUser.split('@')[0]} Telah tersambung ke server ${q.name}...`, m);
        let i = db.set.findIndex(v => v[0] == conn.createJid(conn.user.id))
        if (!db.set[i][1].jadibot.findIndex(v => v.id == noUser) == -1) {
        db.set[i][1].jadibot.push({ id: m.sender, bot: noUser, folder: fold })
        }
	} else if (connection == 'close') {
    
		kontol(conn, q, m, db, fold)
		conn.sendteks(m.chat, `Menghubungkan ke session...`, m);
	}
}

let mulai = async (conn, q, m, db, fold) => {
	const { state, saveCreds } = await useMultiFileAuthState(fold);
	const conn2 = A(Object.assign(configConnectionJadibot, { auth: state }));
	bind(conn2)
	store.bind(conn2.ev);
		conn2.ev.on('connection.update', async (u) => bebek(m, u, conn, q, mulai, conn2, db, fold));
		conn2.ev.on('messages.upsert', async (u) => msgUp(u, conn2, store, db, q));
		conn2.ev.on('creds.update', saveCreds);
	return conn2;
}

export { mulai, bebek }