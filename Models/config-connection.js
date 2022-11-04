import q from '../Setting/settings.js';
import baileys from 'baileys';
import p from 'pino';

export { store, configConn };

const logs = p({ level: 'silent' });
const store = baileys.makeInMemoryStore({ logger: logs });
const configConn = {
	      browser: q.browser, // Browser from config
	      syncFullHistory: false, // mematikan sinkoniasi riwayat history
	      printQRInTerminal: true, // QR terminal
	      logger: logs, // Pino String query
	      qrTimeout: q.longqr, // Long qr time out from config
	      generateHighQualityLinkPreview: true, // Biar Hd
	      markOnlineOnConnect: false, // ONLINE KETIKA TERKONEKSI
	      getMessage: async () => { return { conversation: 'tes' } }
	   };
