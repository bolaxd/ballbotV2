
export default async (m, { up, q, d, conn, bot }) => {
	try {
		let parti = up.key.participant;
		let mstub = up.messageStubType ? up.messageStubParameters.join() : '';
		const r = (teks) => (teks).replace('@user', '@'+mstub.split('@')[0] || '').replace('@sub', mstub || '').replace('@admin', '@'+parti.split('@')[0] || '');
		if (m.isGc) {
			if (conn.db.data.chat[m.chat].detect) {
				switch (up.messageStubType) {
					case 21: { // DETEK SUBJECT
						throw r(q.fsub);
					} break;
					case 22: { // DETEK PP UPDATE GC
						throw r(q.fppgc);
					} break;
					case 25: { // DETEK SETTING GC
						if (mstub == 'off') throw r(q.fbinp);
						if (mstub == 'on') throw r(q.ftinp);
					} break;
					case 26: { // DETEK TUTUP/BUKA GC
						if (mstub == 'off') throw r(q.fbgc);
						if (mstub == 'on') throw r(q.ftgc);
					} break;
					case 27: { // ADD
						if (!up.key.participant) throw r(q.faddlink);
						if (!up.key.participant && m.isOwn) throw r(q.fownerjoin);
						throw r(q.faddadmin);
					} break;
					case 28: { // KICK
						if (mstub.includes(bot)) return
						throw r(q.fkick);
					} break;
					case 29: { // PROMOTE
						throw r(q.fpm);
					} break;
					case 30: { // DEMOTE
						throw r(q.fdm);
					} break;
					case 32: { // LEAVE
						if (mstub.includes(bot)) return
						throw r(q.fout);
					} break;
					case 71: { // ADD INVITE
						throw r(q.faddinv);
					} break;
					default:
					const p = (parse) => parse.replace('@jmlh', (m.msg.ephemeralExpiration == 7776000 ? '90 Hari' : m.msg.ephemeralExpiration == 604800 ? '7 Hari' : m.msg.ephemeralExpiration == 86400 ? '24 Jam' : '') || '');
					if (/protocolMessage/.test(m.mtype) && m.msg.ephemeralExpiration && m.msg.type == 3) throw p(r(q.fephe));
					else if (/protocolMessage/.test(m.mtype) && !m.msg.ephemeralExpiration && m.msg.type == 3) throw r(q.fofephe);
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
	} catch (e) {
		conn.sendteks(m.chat, e, d.f1('Notifikasi Update Group', ''), {mentions: await conn.ments(e)})
	}
}