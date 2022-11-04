import fs from 'fs';
import simi from 'similarity'; //Matikan jika kamu gk perlu kemiripan commands
import { format } from 'util';
const jsoncmd = JSON.parse(fs.readFileSync('./utils/handler/commands.json'));

export default async (m, extra) => {
	let { q, d, bb, bot, conn, isblock, up, isAdmin, isBotAd } = extra
	/* Aku dapet dari : https://stackoverflow.com/questions/36367532/how-can-i-conditionally-import-an-es6-module */
	const path = './feature/'
	const send_err = async (err) => {
		q.developer.map(async v=> {
			await q.delay(3000)
			conn.sendteks(v+q.idwa, `Command : /${m.command}\nOleh : @${m.sender.split('@')[0]}\n\n${bb(format(err))}`, d.f1(err, ''), {mentions: [m.sender]})
		})
	}
	const call = (PATH) => import(path+PATH).then(v=>v.handle(m, extra))
		.catch(e=>send_err(e))
			
	const cmd = (command, PATH, type = '') => {
		if (type == "emote") {
			if((m.rtext == command) && !isblock) import(path+PATH).then(__cmd=>__cmd.handle(m, extra))
				.catch(__err=> send_err(__err))
		} else if (type == "cmd") {
			if((simi(command, m.command)>=q.sensitive)&&!isblock) import(path+PATH).then(__all=>__all.handle(m, extra))
				.catch(__err=> send_err(__err))
		}
	}
		// COMMAND
		if (!m.isOwn && !conn.db.data.set[bot].public) return
		if (m.message) call('__handle-all.js');
		jsoncmd[0].map(i => cmd(i[0], i[1]+'.js', 'cmd'))
		// COMMAND REACT
		jsoncmd[1].map(u => cmd(u[0], u[1]+'.js', 'emote'))
};
