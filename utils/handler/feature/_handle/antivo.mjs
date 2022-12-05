const handle = async(m, { q, d, conn, isAdmin, mime, db }) => {
	if (!m.isGc) return;
   let i = db.grup.findIndex((v) => v[0] == m.chat);
   if (db.grup[i][1].antivo) {
		if (/viewOnce/.test(m.mtype)) {
			if (!isAdmin) return
			if (/image/.test(mime)) {
				let dl = await m.download();
				conn.sendMessage(m.chat, { image: dl, caption: `<Anti View Once/>\n\nMatikan anti View Once di *.info*\nCaption: ${m.text}`}, {quoted: d.f1('Anti View Once...','')})
			} else
			if (/video/.test(mime)) {
				let dl = await m.download();
				conn.sendMessage(m.chat, { video: dl, caption: `<Anti View Once/>\n\nMatikan anti View Once di *.info*\nCaption: ${m.text}`}, {quoted: d.f1('Anti View Once...','')})
			}
		}
	}
};

export default handle;