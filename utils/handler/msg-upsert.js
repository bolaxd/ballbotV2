import { db } from '../schema/schema.js';
import d from '../helper/function.js';
import q from '../../Setting/settings.js';
import detect from './detect.js';
import cmds from './commands.js';
import parser from './parse-messages.js';
import printToConsole from '../print.js';
const bb = (teks) => '```'+teks+'```'
const isntNull = x => x !== null 
const findAdmin = arr =>  arr.filter(v=> v.admin !== null).map(i=>i.id)
let cache = new Map();

export default async (iqbal, serve, s) => {
	try {
		let up = iqbal.messages[0]
		if (!up) return 
		if (up.key.remoteJid === q.idst) return
		await serve.readMessages([up.key])
		if (up.key.id.endsWith('BOLA') && up.key.id.length === 32) return
		if (up.key.id.startsWith('3EB0') && up.key.id.length === 12) return
		// console.log(up);
		let m = parser(serve, up, s)
		let bot = await serve.createJid(serve.user.id)
		// Save cache :v (maap ye gw enc tapi work lahh)
		const _0x54071a=_0xb4c3;(function(_0x3af470,_0x43aeb9){const _0x125392=_0xb4c3,_0x59b86f=_0x3af470();while(!![]){try{const _0x265d7f=-parseInt(_0x125392(0x9a))/0x1+-parseInt(_0x125392(0x9e))/0x2+parseInt(_0x125392(0x9d))/0x3*(parseInt(_0x125392(0xa6))/0x4)+parseInt(_0x125392(0xa7))/0x5*(parseInt(_0x125392(0x91))/0x6)+parseInt(_0x125392(0x97))/0x7*(-parseInt(_0x125392(0xa9))/0x8)+-parseInt(_0x125392(0xa5))/0x9+parseInt(_0x125392(0x90))/0xa;if(_0x265d7f===_0x43aeb9)break;else _0x59b86f['push'](_0x59b86f['shift']());}catch(_0xc8c2c8){_0x59b86f['push'](_0x59b86f['shift']());}}}(_0x3765,0x95a0d));m[_0x54071a(0x8f)]&&(!cache[_0x54071a(0x9f)](m[_0x54071a(0xa1)])&&(cache[_0x54071a(0xa3)](m[_0x54071a(0xa1)],await serve['groupMetadata'](m[_0x54071a(0xa1)])['catch'](_0x1e5066=>{})),console['log'](_0x54071a(0xa2)+m['chat']+'\x20telah\x20siap')));function _0xb4c3(_0x16bc34,_0x463930){const _0x3765c0=_0x3765();return _0xb4c3=function(_0xb4c3b6,_0x5f21b5){_0xb4c3b6=_0xb4c3b6-0x8b;let _0x3d1044=_0x3765c0[_0xb4c3b6];return _0x3d1044;},_0xb4c3(_0x16bc34,_0x463930);}if(up[_0x54071a(0x8b)]==0x15&&cache[_0x54071a(0x9f)](m[_0x54071a(0xa1)])||up['messageStubType']==0x19&&cache[_0x54071a(0x9f)](m[_0x54071a(0xa1)])||up[_0x54071a(0x8b)]==0x1a&&cache[_0x54071a(0x9f)](m[_0x54071a(0xa1)])||up[_0x54071a(0x8b)]==0x1b&&cache[_0x54071a(0x9f)](m['chat'])||up[_0x54071a(0x8b)]==0x1c&&cache[_0x54071a(0x9f)](m[_0x54071a(0xa1)])||up['messageStubType']==0x1d&&cache[_0x54071a(0x9f)](m['chat'])||up[_0x54071a(0x8b)]==0x1e&&cache[_0x54071a(0x9f)](m[_0x54071a(0xa1)])||up[_0x54071a(0x8b)]==0x20&&cache[_0x54071a(0x9f)](m[_0x54071a(0xa1)])||up['messageStubType']==0x47&&cache['has'](m[_0x54071a(0xa1)])){let user=up[_0x54071a(0x8b)]?up[_0x54071a(0x8e)][_0x54071a(0x96)]():'';if(up['messageStubType']==0x1c&&user['includes'](bot))return cache[_0x54071a(0xa4)](m[_0x54071a(0xa1)],await serve[_0x54071a(0x99)](m['chat'])[_0x54071a(0xa0)](_0x27d406=>{})),console[_0x54071a(0x9b)](_0x54071a(0x8d)+m[_0x54071a(0xa1)]+_0x54071a(0x94));if(up[_0x54071a(0x8b)]==0x20&&user['includes'](bot))return cache[_0x54071a(0xa4)](m[_0x54071a(0xa1)],await serve['groupMetadata'](m['chat'])['catch'](_0x277247=>{})),console['log'](_0x54071a(0x8d)+m[_0x54071a(0xa1)]+'\x0aJangan\x20lupa\x20Follow\x20my\x20github:\x20https://github.com/bolaxd/');cache[_0x54071a(0xa3)](m['chat'],await serve[_0x54071a(0x99)](m[_0x54071a(0xa1)])[_0x54071a(0xa0)](_0x210dce=>{})),console[_0x54071a(0x9b)](_0x54071a(0xa8)+m['chat']+_0x54071a(0x95));}(/protocolMessage/[_0x54071a(0x8c)](m[_0x54071a(0x98)])&&m[_0x54071a(0x9c)][_0x54071a(0x93)]&&m[_0x54071a(0x9c)][_0x54071a(0x92)]==0x3&&cache[_0x54071a(0x9f)](m['chat'])||/protocolMessage/[_0x54071a(0x8c)](m[_0x54071a(0x98)])&&!m['msg'][_0x54071a(0x93)]&&m[_0x54071a(0x9c)][_0x54071a(0x92)]==0x3&&cache[_0x54071a(0x9f)](m[_0x54071a(0xa1)]))&&(cache[_0x54071a(0xa3)](m[_0x54071a(0xa1)],await serve[_0x54071a(0x99)](m[_0x54071a(0xa1)])[_0x54071a(0xa0)](_0x1ebb3f=>{})),console['log']('Mereload\x20metadata\x20pada\x20chat\x20'+m[_0x54071a(0xa1)]+'\x0aJangan\x20lupa\x20star\x20my\x20github:\x20https://github.com/bolaxd/'));function _0x3765(){const _0x31e4c8=['mtype','groupMetadata','653272GsZVRs','log','msg','261633iQYnbM','1099340SKkawH','has','catch','chat','Pembuatan\x20metadata\x20pada:\x20','set','delete','648630lGUYlk','4ydVdEC','3902060YUZHRQ','Mereload\x20metadata\x20pada\x20chat\x20','2993864GUqQLM','messageStubType','test','Mendelete\x20metadata\x20pada\x20chat\x20','messageStubParameters','isGc','13944990jUNGPU','6XadRUz','type','ephemeralExpiration','\x0aJangan\x20lupa\x20Follow\x20my\x20github:\x20https://github.com/bolaxd/','\x0aJangan\x20lupa\x20star\x20my\x20github:\x20https://github.com/bolaxd/','join','7rixCht'];_0x3765=function(){return _0x31e4c8;};return _0x3765();}
		let extra = {}
			extra.q = q;
			extra.d = d;
			extra.up = up; 
			extra.bb = bb;
			extra.findAdmin = findAdmin;
			extra.conn = serve;
			extra.isNum = x => typeof x == 'number' && isNaN(x);
			extra.more = String.fromCharCode(8206).repeat(4001);
			extra.budy = typeof m.text == 'string' ? m.text : '';
			extra.bot = bot
			extra.lblock = await serve.fetchBlocklist().catch(_=>[]);
			extra.isblock = m.isGc ? extra.lblock.includes(m.sender) : false;
			extra.meta = m.isGc ? await cache.get(m.chat) : {} || {};
			extra.members = m.isGc ? await extra.meta.participants : [] || [];
			extra.admins = m.isGc ? await findAdmin(extra.members) : [] || [];
			extra.isAdmin = m.isGc ? extra.admins.includes(m.sender) :false;
			extra.isBotAdmin = m.isGc ? extra.admins.includes(extra.bot) :false;
			extra.getpp = async(sender) => {let pp;try {pp = await serve.profilePictureUrl(sender, 'image')} catch (e) {pp = q.thumb2};return pp};
			extra.quoted = m.quoted ? m.quoted : m;
			extra.quotry = m.quoted ? m.quoted.text : m.query;
			extra.mime = (extra.quoted.msg || extra.quoted).mimetype || extra.quoted.mediaType || '';
			db(m, extra)
			printToConsole(m, extra)
			detect(m, extra)
			cmds(m, extra)
     	} catch (e) {
		console.error(e);
	}
}
