import q from '../Setting/settings.mjs';
import baileys from 'baileys';
import p from 'pino';

export { store, configConn, configConnectionJadibot };

const logs = p({ level: 'silent' });
const store = baileys.makeInMemoryStore({ logger: logs });
const configConn = {
	      browser: q.browser, // Browser from config
	      syncFullHistory: false, // mematikan sinkoniasi riwayat history
	      printQRInTerminal: true, // QR terminal
	      logger: logs, // Pino String query
	      qrTimeout: q.longqr, // Long qr time out from config
	      generateHighQualityLinkPreview: true, // Biar Hd
	      markOnlineOnConnect: true, // ONLINE KETIKA TERKONEKSI
	      getMessage: async () => { return { conversation: 'Maaf Bot sedang tidak ingin merespon!!\nTunggu sebentar mereload pesan!!!' } }
	   };


const configConnectionJadibot = {
	printQRInTerminal: false,
	markOnlineOnConnect: true,
	syncFullHistory: false,
	qrTimeout: q.longqr,
    logger: logs
}
