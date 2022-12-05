import { tebakkata } from '@bochilteam/scraper';

const handle = async (m, { conn, q, d, bb, repl }) => {
	conn.kata =  conn.kata ? conn.kata : {}
	let i = m.chat
	if (i in conn.kata) return repl('Masih ada game di sini!!!\nMohon tunggu selesai...');
	let res = await tebakkata().then(v=> v)
	let soal = res.soal
	let jawaban = res.jawaban
	console.log('Soal: '+soal + '\n' + 'Jawaban: '+jawaban);
	let teks = `*Game Tebak kata*\n\nSilahkan jawab soal ini:\n${soal}\nWaktu: ${q.timeoutgame/1000} detik\n`
	let teks2 = `Waktu berakhir :(\nJawaban dari soal :\n\n${bb(soal)}\n\nAdalah : ${bb(jawaban)}`
	conn.kata[i] = [
		await repl(teks),
		soal,
		jawaban.toLowerCase(),
		setTimeout(function() {
			if (conn.kata[i]) repl(teks2);
			delete conn.kata[i];
		}, q.timeoutgame)
	]
}

export default handle;