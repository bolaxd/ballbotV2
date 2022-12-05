import { imgToStiker } from '../../../util/convert-media.js';

const handle = async (m, { q, conn, repl, bot, db }) => {
	if (!m.query) return repl(q.notext);
	let buf = await q.getbuff(`https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=800&fontsize=500&fillTextType=1&fillTextPattern=Warning!&text=${encodeURIComponent(m.query)}`)
   let n = db.set.findIndex
(v=>v[0] == bot)
	let res = await imgToStiker(buf, {
		name: db.set[n][1].pack,
      author: db.set[n][1].auth
	});
	conn.sendstik(m.chat, res, m);
}

export default handle;