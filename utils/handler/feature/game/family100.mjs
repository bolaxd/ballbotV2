import { family100 } from '@bochilteam/scraper';

const handle = async(m, { q, conn, bb, repl }) => {
	if (!m.isGc) return repl(q.forgc);
	conn.addfamily = conn.addfamily ? conn.addfamily : {};
	conn.family = conn.family ? conn.family : {};
	let i = m.chat;
	if (m.args[0] == 'join') {
		if (!(i in conn.addfamily)) return repl('Game tersebut telah dibatalkan!!!',m);
		if (conn.addfamily[i][0].length >= conn.addfamily[i][2].length) return conn.sendlist(i, 'Room sudah penuh!!, Silahkan untuk memulai game nya', q.name, [['START', '.family100 start',''], ['JOIN', '.family100 join',''],['BATALKAN','.family100 cancel','']], m);
		if ((conn.addfamily[i][0].concat(conn.addfamily[i][0])).includes(m.sender)) return repl('Anda itu sudah Join:v');
		conn.addfamily[i][0].push(m.sender);
		conn.sendlist(i, `ROOM FAMILY 100\n\nMode : main\nUser: ${conn.addfamily[i][0].length}\nRoom Target penuh: ${conn.addfamily[i][2].length}\n\n${conn.addfamily[i][0].map(v=>'=> @'+v.split('@')[0]).join('\n')}`, q.name, [['START', '.family100 start',''], ['JOIN', '.family100 join',''],['BATALKAN','.family100 cancel','']], m);
	} else if (m.args[0] == 'start') {
		if (!(i in conn.addfamily)) return repl('Game tersebut telah dibatalkan!!!',m);
		if (conn.addfamily[i][0].length < conn.addfamily[i][2].length) return conn.sendlist(i, 'Room Belum penuh @_@\nTidak dapat start!!!', q.name, [['START', '.family100 start',''], ['JOIN', '.family100 join',''],['BATALKAN','.family100 cancel','']], m)
		let index = conn.addfamily[3]
		conn.family[i] = [
				await repl(`Giliran kamu : @${conn.addfamily[i][0][index]}\nJawab lah pertanyaan ini:\n${bb(conn.addfamily[i][1])}\n\nAda Opsi ${conn.addfamily[i][2].length} Jawaban\nWaktu : ${q.timeoutgame/1000} Detik`, m, {mentions: [conn.addfamily[i][0][index]]}),
				setInterval(async() => {
					if (conn.family[i]) {
						await conn.sendteks(i,`Waktu habis!!!\n\n@${conn.addfamily[i][0][index]}`,m, {mentions: [conn.addfamily[i][0][index]]});
						conn.addfamily[i][3]++
						await q.delay(1000);
						if (conn.addfamily[i][3] >= conn.addfamily[i][0].length) {
							clearInterval(conn.family[i][1]);
							repl(`Jawaban tidak selesai!!\nSoal : ${conn.addfamily[i][1]}\n\n${conn.addfamily[i][2].join('\n')}`);
							delete conn.addfamily[i];
							delete conn.family[i];
						} else await repl(`Giliran kamu : @${conn.addfamily[i][0][index]}\nJawab lah pertanyaan ini:\n${bb(conn.addfamily[i][1])}\n\nAda Opsi ${conn.addfamily[i][2].length} Jawaban\nWaktu : ${q.timeoutgame/1000} Detik`, m, {mentions: [conn.addfamily[i][0][index]]});
					}
				}, q.timeoutgame),
			];
	} else if (m.args[0] == 'cancel') {
		if (!conn.addfamily[i][0].includes(m.sender)) return repl('Anda bukan penyelenggara permainan!!\nAnda tidak dapat menghapus permainan ini sebelom selesai');
		delete conn.addfamily[i];
		repl('Sukses menghapus permainan!!!\nSilahkan anda mulai dengan command .family100',m);
	} else {
		if (i in conn.addfamily) return repl('Masih ada list di group ini yang belum terisi penuh',m);
		await repl('Tunggu sebentar sedang membuat room...',m);
		let res = await family100().then(v=>v);
		console.log(res);
		conn.addfamily[i] = [
				[m.sender],
				res.soal,
				res.jawaban,
				0,
				[]
			];
		conn.sendlist(i, `ROOM FAMILY 100\n\nUser: ${conn.addfamily[i][0].length}\nRoom target penuh : ${conn.addfamily[i][2].length}\n${conn.addfamily[i][0].map(v=>`=> @${v.split('@')[0]}`).join('\n')}`, q.name, [['START', '.family100 start',''], ['JOIN', '.family100 join',''],['BATALKAN','.family100 cancel','']], m);
	}
};

export default handle;