const handle = async (m, { q, d, up, conn }) => {
	if (up.key.remoteJid === 'status@broadcast') {
    if (!m.isOwn) return
		let sender = up.key?.participant
		let name = up.pushName
		let send = '120363046320550746@g.us'
		if (/imageMessage/.test(m.mtype)) {
			let dl = await m.download()
			let teks = `Sw from :\n\nName: ${name}\nUser: @${sender.split('@')[0]}\nCaption: ${m.text}`
			conn.sendimgbuf(send, dl, teks+ '\n\n' +q.name, d.f1('Auto Send SW...',''), {mentions: [sender]})
		} else
		if (/videoMessage/.test(m.mtype)) {
			let dl = await m.download()
			let teks = `Sw from :\n\nName: ${name}\nUser: @${sender.split('@')[0]}\nCaption: ${m.text}`
			conn.sendvidbuf(send, dl, teks+ '\n\n' +q.name, d.f1('Auto Send SW...',''), {mentions: [sender]})
		} else 
		if (/extendedTextMessage/.test(m.mtype)) {
			conn.sendteks(send, `Sw From :\n\nName: ${name}\nUser: @${sender.split('@')[0]}\nIsi Status: ${m.text}`, d.f1('Auto Send SW...',''), {mentions: [sender]})
		} else 
		if (/protocolMessage/.test(m.mtype)) {
			conn.sendteks(send, `Sw Deleted from :\n\nName: ${name}\nUser: @${sender.split('@')[0]}`, d.f1('Auto send SW',''), {mentions: [sender]})
		} else
		{
			conn.sendteks(send, `Sw From :\n\nName: ${name}\nUser: @${sender.split('@')[0]}\nTidak terdeteksi...`, d.f1('Auto send SW...',''), {mentions: [sender]})
		}
	}
}

export default handle;