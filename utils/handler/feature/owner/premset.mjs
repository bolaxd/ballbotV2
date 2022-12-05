import fs from 'fs';

let pth = './Setting/prems.json'
const handle = async (m, { q, conn, repl }) => {
	if (!m.isOwn) return repl(q.owner)
	var prems = q.prems
	var user = m.mentionedJid[0] ? m.mentionedJid[0].split('@')[0] : m.quoted ? m.quoted.sender.split('@')[0] : m.query.replace(/[^0-9]/g, '')
	if (!prems.includes(user)) {
		prems.push(user)
		var newPrems = JSON.stringify(prems)
		fs.writeFile(pth, newPrems, err => {
			if (err) return repl('elorr')
			repl(`Sukses add ${user} menjadi user premium`)
		})
	} else if (prems.includes(user)) {
		let position = prems.indexOf(user);
		prems.splice(position, 1);
		var nowData = JSON.stringify(prems);
		fs.writeFile(pth, nowData, err => {
			if (err) return repl('elorr')
			repl(`Sukses delete ${user} dari user premium`)
		}) 
	}
}

export default handle;