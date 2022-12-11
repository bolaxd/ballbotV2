process.on("uncaughtException", console.error); // MEMAKSA TETAP HIDUP WALAU ERROR
import { _ } from "./utils/print.mjs";
console.log(_.cl());
const { default: KUNTUL_KAWAN, useMultiFileAuthState } = (await import("baileys")).default;
import initDatabase from './utils/db/database.mjs';
import { upsert } from "./utils/handler/index.mjs";
import { bind } from "./utils/util/index.mjs";
import prototypeMaker from "./utils/helper/prototype.mjs";
import { configConn, store } from "./utils/config-connection.mjs";
import connection_update from "./utils/connection.mjs";
import q from "./Setting/settings.mjs";

/*
 * @param
 * @returns
 * Created By https://github.com/bolaxd/
 */

async function mulai() {
   try {
      const { state, saveCreds } = await useMultiFileAuthState(q.session);
      const serve = KUNTUL_KAWAN(Object.assign(configConn, { auth: state }));
      store.bind(serve.ev);
      bind(serve);
      // Menangani koneksi
      serve.ev.on("connection.update", async (iqbal) =>
         connection_update(iqbal, serve, mulai)
      );
      // Menangani acara { pesan, update }
      serve.ev.on("messages.upsert", async (iqbal) =>
         upsert(iqbal, serve, store, q)
      );
      // Simpan credensial login
      serve.ev.on("creds.update", saveCreds);
      return serve;
   } catch (e) {
      console.log(e);
   }
}
prototypeMaker();
initDatabase();
mulai();