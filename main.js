process.on('uncaughtException', console.error); // MEMAKSA TETAP HIDUP WALAU ERROR
import { _ } from './Models/print.js';
console.log(_.cl());
const { default: KUNTUL_KAWAN, useMultiFileAuthState } = (await import('baileys')).default;
import { configConn, store } from './Models/config-connection.js';
import upsert_message from './Models/Pesan/msg-upsert.js';
import connection_update from './Models/connection.js';
import bind from './Models/Function/serve.js';
import q from './Setting/settings.js';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
// import $ from 'lodash';
/*
* @param
* from adiwajshing/baileys
* @returns
* Created By https://github.com/bolaxd/
*/

async function mulai() {
	try {
	   const { state, saveCreds } = await useMultiFileAuthState(q.session);
	   const serve = KUNTUL_KAWAN(Object.assign(configConn, { auth: state }));
	   store.bind(serve.ev);
	   bind(serve);
		// DATABASE
		const db = new JSONFile(q.namedb + '.json')
		serve.db = new Low(db);
		//DB fungtion load
		serve.loadDB = async function loadDB() {
			if (serve.db.READ) return new Promise((resolve) => setInterval(function () {
				(!serve.db.READ ? (clearInterval(this), resolve(serve.db.data == null ? serve.loadDB(): serve.db.data)): null)
			}, 1 * 1000))
			if (serve.db.data !== null) return
			serve.db.READ = true
			await serve.db.read()
			serve.db.READ = false
			serve.db.data = {
				user: {},
				chat: {},
				set: {},
				/* Tambahkan kreasi kamu disini */
				...(serve.db.data || {})};
				// serve.db.chain = $.chain(serve.db.data)
		}
		if (serve.db) setInterval(async function() {
			if (serve.db.data) await serve.db.write()
		}, q.autoload);
		serve.loadDB();
	   // Menangani koneksi
	   serve.ev.on('connection.update', async (iqbal) => connection_update(iqbal, serve, mulai));
	   // Menangani acara { pesan, update }
	   serve.ev.on('messages.upsert', async (iqbal) => upsert_message(iqbal, serve, store));
	   // Simpan credensial login
	   serve.ev.on('creds.update', saveCreds);
	} catch (e) {
		console.log(e);
	}
};
mulai();