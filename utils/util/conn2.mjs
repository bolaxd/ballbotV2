const { default: A, DisconnectReason, useMultiFileAuthState } = (await import('baileys')).default;
import ws from 'ws';
import qrcd from 'qrcode';
import bind from './serve.mjs';
import { configConnectionJadibot, store } from '../config-connection.mjs';
import msgUp from '../handler/msg-upsert.mjs';

const bebek = async (m, u, a, q, g, p) => {
	let { lastDisconnect, connection, qr } = u
	if (qr) {
		let scanner = await a.sendimgbuf(m.chat, Buffer.from((await qrcd.toDataURL(qr, { scale: 8 })).split(',')[1], 'base64'), `Silahkan Scan QR Code ini!!!\nWaktu scan Cuma ${q.longqr/1000} detik...\n\nQR akan berhenti dengan sendiri jika tidak ada yang tersambung!!!`, m);
		setTimeout(async () => {
			await a.sendMessage(m.chat, { delete: scanner.key });
		}, q.longqr);
	}
	if (connection == 'open') {
		p(g, a, q, m, true)
		a.sendteks(m.chat, `@${m.sender.split('@')[0]} Telah tersambung ke server ${q.name}....`, m);
	} else if (connection == 'close') {
		p(g, a, q, m, false)
		a.sendteks(m.chat, `Koneksi telah diputuskan...`, m);
	}
}

let conn2 = async (user, conn, q, m, event) => {
	let folder = `TMP/jadibot-${user}`
	const { state, saveCreds } = await useMultiFileAuthState(folder);
	const c = A(Object.assign(configConnectionJadibot, { auth: state }));
	bind(c)
	store.bind(c.ev);
	if (event == false) {
 		c.ev.off('connection.update', async (u) => bebek(m, u, conn, q, user, conn2));
		c.ev.off('messages.upsert', async (u) => msgUp(u, c, store));
		c.ev.off('creds.update', saveCreds);
	} else {
		c.ev.on('connection.update', async (u) => bebek(m, u, conn, q, user, conn2));
		c.ev.on('messages.upsert', async (u) => msgUp(u, c, store));
		c.ev.on('creds.update', saveCreds);
	}
	return c;
}

export { conn2, bebek }