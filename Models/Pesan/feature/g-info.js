export const handle = async (m, { q, conn, meta, isBotAdmin, isAdmin }) => {
	if (!m.isGc) return conn.sendteks(m.chat, q.forgc, m)
	if (m.query == 'link') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
			if (isAdmin) {
				conn.groupInviteCode(m.chat)
					.then(v => conn.sendteks(m.chat, `Link Group\n\nhttps://chat.whatsapp.com/${v}`, m))
					.catch(e => conn.sendteks(m.chat, q.gagal, m))
			} else if (!isAdmin) {
				if (!conn.db.data.chat[m.chat].link) return conn.sendteks(m.chat, q.linkadm, m)
				conn.groupInviteCode(m.chat)
					.then(v => conn.sendteks(m.chat, `Link Group\n\nhttps://chat.whatsapp.com/${v}`, m))
					.catch(e => conn.sendteks(m.chat, q.gagal, m))
			}
	} else if (m.query == 'revoke') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		conn.groupRevokeInvite(m.chat)
			.then(v => conn.sendteks(m.chat, q.sukses, m))
			.catch(v => conn.sendteks(m.chat, q.gagal, m))
	} else if (m.query == 'gcbuka') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		conn.groupSettingUpdate(m.chat, 'not_announcement')
			.then(v => conn.sendteks(m.chat, q.sukses, m))
			.catch(v => conn.sendteks(m.chat, q.gagal, m))
	} else if (m.query == 'gctutup') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		conn.groupSettingUpdate(m.chat, 'announcement')
			.then(v => conn.sendteks(m.chat, q.sukses, m))
			.catch(v => conn.sendteks(m.chat, q.gagal, m))
	} else if (m.query == 'infobuka') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		conn.groupSettingUpdate(m.chat, 'unlocked')
			.then(v => conn.sendteks(m.chat, q.sukses, m))
			.catch(v => conn.sendteks(m.chat, q.gagal, m))
	} else if (m.query == 'infotutup') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		conn.groupSettingUpdate(m.chat, 'locked')
			.then(v => conn.sendteks(m.chat, q.sukses, m))
			.catch(v => conn.sendteks(m.chat, q.gagal, m))
	} else if (m.query == 'detekbuka') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].detect) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].detect = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'detektutup') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].detect) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].detect = false
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'linkbuka') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].link) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].link = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'linktutup') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].link) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].link = false
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'linkon') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].antilink) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].antilink = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'linkoff') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].antilink) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].antilink = false
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'vnon') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].antivn) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].antivn = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'vnoff') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].antivn) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].antivn = false
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'stikon') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].antistik) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].antistik = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'stikoff') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].antistik) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].antistik = false
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'vidon') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].antivid) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].antivid = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'vidoff') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].antivid) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].antivid = false
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'imgon') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].antiimg) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].antiimg = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'imgoff') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].antiimg) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].antiimg = false
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'boton') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].antibot) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].antibot = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'botoff') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].antibot) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].antibot = false
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'luaron') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].antiluar) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].antiluar = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'luaroff') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].antiluar) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].antiluar = false
		conn.sendteks(m.chat, q.sukses, m)
	} else {
		let list = []
		let teks = `INFO GROUP \n\n`
			 teks += `Nama Group: *${meta.subject}*\n`
			 teks += `Members: *${meta.size}*\n`
			 teks += `Pembuat Group: *${meta.owner == undefined ? 'Kosong' : meta.owner.split('@')[0]}*\n`
			 teks += `Status Anda: *${isAdmin ? 'Orang dalam' : 'Bukan orang dalam'}*\n`
			 teks += `Edit info: *${meta.restrict ? 'Hanya admin' : 'Semua member'}*\n`
			 teks += `Kirim pesan: ${meta.announce ? 'Hanya admin' : 'Semua member'}\n`
			 teks += `Detect Group: *${conn.db.data.chat[m.chat].detect ? 'Online' : 'Offline'}*\n`
			 teks += isAdmin ? `Bagikan link Group: *${conn.db.data.chat[m.chat].link ? 'Boleh' : 'Jangan'}*\n` : ``
			 teks += `Anti link: *${conn.db.data.chat[m.chat].antilink ? 'hidup' : 'mati'}*\n`
			 teks += `Anti VN: *${conn.db.data.chat[m.chat].antivn ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Sticker: *${conn.db.data.chat[m.chat].antistik ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Image: *${conn.db.data.chat[m.chat].antiimg ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Video: *${conn.db.data.chat[m.chat].antivid ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Bot: *${conn.db.data.chat[m.chat].antibot ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Nomor Luar: *${conn.db.data.chat[m.chat].antiluar ? 'hidup' : 'mati'}*\n`
		list.push(['Link Group ini', '.info link', 'Link group whatsapp ini'])
		if (isAdmin) {
			list.push(['Reset link grup', '.info revoke', 'Reset atau ganti link group jni dengan yang baru'])
			if (meta.restrict) list.push(['Buka Edit info', '.info infobuka', 'Beri akses member untuk mengedit info group'])
			else list.push(['Tutup Edit Info', '.info infotutup', 'Jangan beri akses member untuk mengedit info group'])
			if (meta.announce) list.push(['Buka Group', '.info gcbuka', 'Beri akses member untuk mengirim pesan ke group'])
			else list.push(['Tutup Group', '.info gctutup', 'Jangan beri akses member untuk mengirim pesan ke group'])
			if (conn.db.data.chat[m.chat].detect) list.push(['Matikan Detect group', '.info detektutup', 'Bot tidak akan memberikan deteksi perubahan group'])
			else list.push(['Hidupkan Detect group', '.info detekbuka', 'Bot akan mulai deteksi perubahan yang ada di group'])
			if (conn.db.data.chat[m.chat].link) list.push(['Jangan Bagi link ke member', '.info linktutup', 'Bot tidak akan memberikan link group kepada member'])
			else list.push(['Bagi link ke member', '.info linkbuka', 'Bot akan memberikan link ke member jika diminta'])
			if (conn.db.data.chat[m.chat].antilink) list.push(['Matikan antilink', '.info linkoff', 'matikan larangan member untuk share link gc lain'])
			else list.push(['Hidupkan anti link', '.info linkon', 'melarang member untuk share link gc lain'])
			if (conn.db.data.chat[m.chat].antivn) list.push(['Matikan anti VN', '.info vnoff', 'matikan larangan member untuk VN di group'])
			else list.push(['Hidupkan anti VN', '.info vnon', 'melarang member untuk VN in group'])
			if (conn.db.data.chat[m.chat].antistik) list.push(['Matikan anti stiker', '.info stikoff', 'matikan larangan member untuk kirim stiker di group'])
			else list.push(['Hidupkan anti stiker', '.info stikon', 'melarang member untuk Kirim stiker in group'])
			if (conn.db.data.chat[m.chat].antiimg) list.push(['Matikan anti Gambar', '.info imgoff', 'matikan larangan member untuk kirim gambar di group'])
			else list.push(['Hidupkan anti gambar', '.info imgon', 'melarang member untuk Kirim gambar in group'])
			if (conn.db.data.chat[m.chat].antivid) list.push(['Matikan anti Video', '.info vidoff', 'matikan larangan member untuk kirim video di group'])
			else list.push(['Hidupkan anti video', '.info vidon', 'melarang member untuk Kirim video in group'])
			if (conn.db.data.chat[m.chat].antibot) list.push(['Matikan anti bot', '.info botoff', 'terima semua bot yang masuk ke group selain bot ini'])
			else list.push(['Hidupkan anti bot', '.info boton', 'Tolak semua bot yang masuk ke group selain bot ini'])
			if (conn.db.data.chat[m.chat].antiluar) list.push(['Matikan anti Nomor luar', '.info luaroff', 'Bot akan mematikan penolakan user Nomor luar yang join'])
			else list.push(['Hidupkan anti Nomor Luar', '.info luaron', 'Bot akan menolak semua user Ber Nomor luar'])
			}
		conn.sendlist(m.chat, teks, q.name, list, m)
	}
}