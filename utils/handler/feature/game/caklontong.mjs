import { caklontong } from '@bochilteam/scraper';

const handle = async (m, { conn, q, d, bb, repl }) => {
	conn.caklontong =  conn.caklontong ? conn.caklontong : {}
	let i = m.chat
	if (i in conn.caklontong) return repl('Masih ada game di sini!!!\nMohon tunggu selesai...');
	let res = await caklontong().then(v=> v)
	let soal = res.soal
	let jawaban = res.jawaban
	console.log('Soal: '+soal + '\n' + 'Jawaban: '+jawaban);
	let teks = `*Game Cak Lontong*\n\nSilahkan jawab soal ini:\n${soal}\nWaktu: ${q.timeoutgame/1000} detik\n`
	let teks2 = `Waktu berakhir :(\nJawaban dari soal :\n\n${bb(soal)}\n\nAdalah : ${bb(jawaban)}\n`
	conn.caklontong[i] = [
		await repl(teks),
		soal,
		jawaban.toLowerCase(),
		setTimeout(function() {
			if (conn.caklontong[i]) repl(teks2);
			delete conn.caklontong[i];
		}, q.timeoutgame)
	]
};

export default handle;