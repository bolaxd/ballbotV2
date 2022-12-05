import fs from 'fs';

const handle = async (m, { q, conn, repl }) => {
	var owner = q.developer
	var user = m.mentionedJid[0] ? m.mentionedJid[0].split('@')[0] : m.quoted ? m.quoted.sender.split('@')[0] : m.query.replace(/[^0-9]/g, '')
	if (!owner.includes(user)) {
		owner.push(user)
		var newOwner = JSON.stringify(owner, null, 2)
		fs.writeFile('./Setting/owner.json', newOwner, err => {
			if (err) return repl('elorr')
			repl(`Sukses add ${user} menjadi owner`)
		})
	} else if (owner.includes(user)) {
		let position = owner.indexOf(user);
		owner.splice(position, 1);
		var nowData = JSON.stringify(owner, null, 2);
		fs.writeFile('./Setting/owner.json', nowData, err => {
			if (err) return repl('elorr')
			repl(`Sukses delete ${user} dari owner`)
		}) 
	}
}

export default handle;