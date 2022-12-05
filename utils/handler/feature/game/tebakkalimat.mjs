import got from 'got';

const handle = async (m, { conn, q, d, bb, repl }) => {
	conn.kalimat =  conn.kalimat ? conn.kalimat : {}
	let i = m.chat
	if (i in conn.kalimat) return repl('Masih ada game di sini!!!\nMohon tunggu selesai...');
	let res = q.rdm(await got('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json').json())
	let soal = res.soal
	let jawaban = res.jawaban
	console.log('Soal: '+soal + '\n' + 'Jawaban: '+jawaban);
	let teks = `*Game Tebak kalimat*\n\nSilahkan jawab soal ini:\n${soal}\nWaktu: ${q.timeoutgame/1000} detik\n`
	let teks2 = `Waktu berakhir :(\nJawaban dari soal :\n\n${bb(soal)}\n\nAdalah : ${bb(jawaban)}`
	conn.kalimat[i] = [
		await repl(teks),
		soal,
		jawaban.toLowerCase(),
		setTimeout(function() {
			if (conn.kalimat[i]) repl(teks2);
			delete conn.kalimat[i];
		}, q.timeoutgame)
	]
}

export default handle;