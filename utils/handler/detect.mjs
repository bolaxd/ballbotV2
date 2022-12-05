const handle = async (m, { up, q, d, conn, bot, cache, db }) => {
	let parti = up.key.participant;
	let mstub = up.messageStubParameters;
	if (m.isGc) {
		let i = db.grup.findIndex(v=> v[0] == m.chat)
			switch (up.messageStubType) {
				case 21: { // DETEK SUBJECT
					let chat = cache.get(m.chat);
					chat.subject = mstub.join();
					chat.subjectOwner = parti;
					chat.subjectTime = Date.now();
					cache.set(m.chat, chat);
					console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
					if (!db.grup[i][1].detect) return
					let text = (q.fsub).replace('@sub', mstub.join()).replace('@admin', '@'+parti.split('@')[0])
					conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
				} break;
				case 22: { // DETEK PP UPDATE GC
					if (!db.grup[i][1].detect) return
					let text = (q.fppgc).replace('@admin', '@'+parti.split('@')[0])
					conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
				} break;
				case 25: { // DETEK SETTING GC
					if (mstub.includes('off')) {
						let chat = cache.get(m.chat);
						chat.restrict = false;
						cache.set(m.chat, chat);
						console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
						if (!db.grup[i][1].detect) return
						let text = (q.fbinp).replace('@admin', '@'+parti.split('@')[0])
						return conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
					} else
					if (mstub.includes('on')) {
						let chat = cache.get(m.chat);
						chat.restrict = true;
						cache.set(m.chat, chat);
						console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
						if (!db.grup[i][1].detect) return
						let text = (q.ftinp).replace('@admin', '@'+parti.split('@')[0])
						return conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
					}
				} break;
				case 26: { // DETEK TUTUP/BUKA GC
					if (mstub.includes('off')) {
						let chat = cache.get(m.chat);
						chat.announce = false;
						cache.set(m.chat, chat);
						console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
						if (!db.grup[i][1].detect) return
						let text = (q.fbgc).replace('@admin', '@'+parti.split('@')[0])
						return conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
					}
					if (mstub.includes('on')) {
						let chat = cache.get(m.chat);
						chat.announce = true;
						cache.set(m.chat, chat);
						console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
						if (!db.grup[i][1].detect) return
						let text = (q.ftgc).replace('@admin', '@'+parti.split('@')[0])
						return conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
					}
						console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
				} break;
				case 27: { // ADD
					let chat = cache.get(m.chat);
					for (let u of mstub) {
						chat.participants.push({ id: u, admin: null });
						chat.size += 1;
					}
					cache.set(m.chat, chat);
					console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
					if (!db.grup[i][1].detect) return
					let text = (v) => (v).replace('@admin', '@'+parti.split('@')[0]).replace('@user', mstub.map(v=> `@${v.split('@')[0]}`).join(', '));
					if (!up.key.participant) return conn.sendteks(m.chat, text(q.faddlink), d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text(q.faddlink))});
					if (!up.key.participant && m.isOwn) return conn.sendteks(m.chat, text(q.fownerjoin), d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text(q.fownerjoin))});
					conn.sendteks(m.chat, text(q.faddadmin), d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text(q.faddadmin))});
				} break;
				case 28: { // KICK
					if (mstub.includes(bot)) return
					let chat = cache.get(m.chat);
					for (let i of mstub) {
						if (i == bot) {
							console.log(`Bot Has kicked in chat: ${m.chat}\nMetadata in chat: ${m.chat} has deleted!!!`);
							continue
						}
						chat.size -= 1;
						let b = chat.participants.findIndex(v=> v.id == i);
						chat.participants.splice(b, 1);
					}
					cache.set(m.chat, chat);
					console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
					if (!db.grup[i][1].detect) return
					let text = (q.fkick).replace('@admin', '@'+parti.split('@')[0]).replace('@user', mstub.map(v=> `@${v.split('@')[0]}`).join(', '))
					conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
				} break;
				case 29: { // PROMOTE
					let chat = cache.get(m.chat);
					for (let i of mstub) {
						let b = chat.participants.findIndex(v=> v.id == i);
						chat.participants.splice(b, 1);
						chat.participants.push({id: i, admin: 'admin'});
					}
					cache.set(m.chat, chat);
					console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
					if (!db.grup[i][1].detect) return
					let text = (q.fpm).replace('@admin', '@'+parti.split('@')[0]).replace('@user', mstub.map(v=> `@${v.split('@')[0]}`).join(', '))
					conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
				} break;
				case 30: { // DEMOTE
					let chat = cache.get(m.chat);
					for (let i of mstub) {
						let b = chat.participants.findIndex(v=> v.id == i);
						chat.participants.splice(b, 1);
						chat.participants.push({ id: i, admin: null });
					}
					cache.set(m.chat, chat);
					console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
					if (!db.grup[i][1].detect) return
					let text = (q.fdm).replace('@admin', '@'+parti.split('@')[0]).replace('@user', mstub.map(v=> `@${v.split('@')[0]}`).join(', '))
					conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
				} break;
				case 32: { // LEAVe
					if (mstub.includes(bot)) return;
					let chat = cache.get(m.chat);
					for (let i of mstub) {
						if (i == bot) continue;
						let b = chat.participants.findIndex(v=> v.id == i);
						chat.participants.splice(b, 1);
						chat.size -= 1;
					}
					cache.set(m.chat, chat);
					console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
					if (!db.grup[i][1].detect) return
					let text = (q.fout).replace('@admin', '@'+parti.split('@')[0]).replace('@user', mstub.map(v=> `@${v.split('@')[0]}`).join(', '))
					conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
				} break;
				case 71: { // ADD INVITE
					let chat = cache.get(m.chat);
					chat.participants.push({id: mstub.join(), admin: null});
					chat.size += 1;
					cache.set(m.chat, chat);
					console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
					if (!db.grup[i][1].detect) return
					let text = (q.faddinv).replace('@admin', '@'+parti.split('@')[0]).replace('@user', mstub.map(v=> `@${v.split('@')[0]}`).join(', '))
					conn.sendteks(m.chat, text, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(text)});
				} break;
				default:
				let stephe = m.msg?.ephemeralExpiration
				const p = (parse) => parse.replace('@jmlh', (stephe == 7776000 ? '90 Hari' : stephe == 604800 ? '7 Hari' : stephe == 86400 ? '24 Jam' : '') || '');
				if (/protocolMessage/.test(m.mtype) && stephe && m.msg.type == 3) {
					let chat = cache.get(m.chat);
					chat.ephemeralDuration = stephe;
					cache.set(m.chat, chat)
					console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
					if (!db.grup[i][1].detect) return
					conn.sendteks(m.chat, p(r(q.fephe)), m);
				} else if (/protocolMessage/.test(m.mtype) && !m.msg?.ephemeralExpiration && m.msg?.type == 3) {
					let chat = cache.get(m.chat);
					chat.ephemeralDuration = undefined
					cache.set(m.chat, chat)
					console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`);
					if (!db.grup[i][1].detect) return
					conn.sendteks(m.chat, r(q.fofephe), m);
				}
			}
	} else {
		switch (up.messageStubType) {
			case 40: {
				let teks = `User : @${up.key.remoteJid.split('@')[0]}\nBaru saja telpon bot\nMatikan Notif ini di /setting jika ini mengganggu\nHidupkan Auto block ketika telepon di /setting`
				conn.sendteks(q.developer[0]+q.idwa, teks, d.f1('Notifikasi Telepon',''), {mentions: await conn.ments(teks)})
			} break;
			case 41: {
				let teks = `User : @${up.key.remoteJid.split('@')[0]}\nBaru saja video call bot\nMatikan Notif ini di /setting jika ini mengganggu\nHidupkan Auto block ketika telepon di /setting`
				conn.sendteks(q.developer[0]+q.idwa, teks, d.f1('Notifikasi Telepon',''), {mentions: await conn.ments(teks)})
			} break;
		}
	}
};

export default handle;