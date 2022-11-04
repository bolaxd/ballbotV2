process.on('uncaughtException', console.error);
const { DisconnectReason } = (await import('baileys')).default;
import q from '../Setting/settings.js';
import b from './Fake/function.js';
import { Boom } from '@hapi/boom';
import { _ } from './print.js';
/**
 * Connection Update from whatsapp
 * @param {*} p  
 * @param {*} serve
 * @param {*} mulai
 * @return { connection }
 * by Bolaxd
 */
export default async(p, serve, mulai) => {
	// console.log(p);
	 let { lastDisconnect, connection } = p
	try {
		if (connection=='close'){
			if(new Boom(lastDisconnect.error).output?.statusCode===DisconnectReason.loggedOut)
			mulai();
			else mulai()
		}else if (connection == 'connecting') {
			_.connect()
		} else if(connection == 'open'){
			console.warn('Connected...')
			serve.sendteks(q.developer[0]+q.idwa, q.connect, b.f1('Notifikasi Connection', ''))
		}
	}catch(e){ console.log(e) }
}

// Note :
// Bang ini bukan gw enc
// Tetapi aku gabungin biar cepet
// Biar lebih fast dalam mengexport ke file lain
//  [ttd: bolaxd]