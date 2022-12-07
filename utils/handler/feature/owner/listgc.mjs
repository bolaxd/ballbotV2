const handle = async (m, { q, conn, findAdmin, repl, cache }) => {
	if (!m.isOwn) return repl(q.owner, m)
	let bot = await conn.createJid(conn.user.id);
	if (m.args[0] === 'detail') {
		if (!m.isOwn) return repl(q.owner)
		let meta = await cache.get(m.args[1])
		let isBot = findAdmin(meta.participants).includes(bot)
		let list = []
		let teks = `====[  DETAIL GROUP  ]====\n\n`
					+ `Nama Group : ${meta.subject}\n`
					+ `ID Group : ${meta.id}\n`
					+ `Member : ${meta.size}\n`
					+ `Batasan Edit Info : ${meta.restric ? 'Iya' : 'Tidak'}\n`
					+ `Batasan kirim pesan : ${meta.announce ? 'Iya' : 'Tidak'}\n`
					+ `Bot Admin : ${isBot ? 'Iya' : 'Tidak'}\n`
					+ `Pesan sementara : ${!meta.ephemeralDuration ? 'Tidak' : 'Aktif'}\n`
		list.push([`leave in gc`, `.listgc leave ${m.args[1]}`, `Keluar dari group ${meta.subject}`])
		list.push([`Get PP`, `.listgc pp ${m.args[1]}`, `Dapatkan PP dri group ${meta.subject}`])
		if (isBot) {
			list.push(['Get Link group', `.listgc link ${m.args[1]}`, `Dapatkan link group ${meta.subject}`])
			if (meta.announce) list.push(['Open group', `.listgc buka ${m.args[1]}`, `Buka group ${meta.subject}`])
			else list.push(['close group', `.listgc tutup ${m.args[1]}`, `Tutup group ${meta.subject}`])
			list.push(['Masukan Owner', `.listgc joinown ${m.args[1]}`])
		}
		conn.sendlist(m.chat, teks, q.name, list, m)
	} else if (m.args[0] === 'pp') {
		if (!m.isOwn) return repl(q.owner)
		let ppnya = await conn.profilePictureUrl(m.args[1], 'image')
		conn.sendimg(m.chat, ppnya, q.sukses, m)
		.catch(e=> repl(q.gagal))
	} else if (m.args[0] === 'link') {
		if (!m.isOwn) return repl(q.owner)
		let code = await conn.groupInviteCode(m.args[1])
		repl(`Link Group ini\n\nhttps://chat.whatsapp.com/${code}`)
		.catch(e=> repl(q.gagal))
	} else if (m.args[0] === 'joinown') {
		if (!m.isOwn) return repl(q.owner)
		conn.groupParticipantsUpdate(m.args[1], [m.sender], 'add').then(v => repl('Anda telah di joinkan bot')).catch(e => repl(q.gagal))
	} else if (m.args[0] === 'leave') {
		if (!m.isOwn) return repl(q.owner)
		conn.sendteks(m.args[1], q.leave, m)
		await q.delay(4000)
			let code = await conn.groupLeave(m.args[1])
				.then(v=>repl(q.sukses))
				.catch(e=> repl(q.gagal))
	} else if (m.args[0] === 'tutup') {
		if (!m.isOwn) return repl(q.owner)
		conn.sendteks(m.args[1], 'Hai kak,\nGroup ini di tutup Oleh owner Secara otomatis\nBuka Jika ini salah')
		await q.delay(4000)
			let code = await conn.groupSettingUpdate(m.args[1], 'announcement')
				.then(v=>repl(q.sukses))
				.catch(e=> repl(q.gagal))
	} else if (m.args[0] === 'buka') {
		if (!m.isOwn) return repl(q.owner)
		conn.sendteks(m.args[1], 'Hai kak,\nGroup ini di buka Oleh owner Secara otomatis\nTutup jika ini salah')
		await q.delay(4000)
			let code = await conn.groupSettingUpdate(m.args[1], 'not_announcement')
				.then(v=>repl(q.sukses))
				.catch(e=> repl(q.gagal))
	} else {
		let list = []
		let gcall = Object.values(await conn.groupFetchAllParticipating().catch(_=> null))
		for (let u of gcall) {
			let on = [`${u.subject}`, `.listgc detail ${u.id}`, `Pembuat: ${u.owner ? u.owner.split("@")[0] : 'Sudah keluar'} | ID: ${u.id} \nKlik untuk lihat detail`]
			list.push(on);
		}
		conn.sendlist(m.chat, `Terdapat Total ${list.length} Group`, q.name, list, m)
	}
};

export default handle;