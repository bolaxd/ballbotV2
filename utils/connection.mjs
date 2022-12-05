//process.on('uncaughtException', console.error);
const { DisconnectReason } = (await import('baileys')).default;
import q from '../Setting/settings.mjs';
import b from './helper/fake.mjs';
import { Boom } from '@hapi/boom';
import { _ } from './print.mjs';
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

//  [ttd: bolaxd]
