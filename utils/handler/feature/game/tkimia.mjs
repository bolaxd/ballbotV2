import { tebakkimia } from '@bochilteam/scraper';

const handle = async (m, { conn, q, d, bb, repl }) => {
	conn.kimia =  conn.kimia ? conn.kimia : {}
	let i = m.chat
	if (i in conn.kimia) return repl('Masih ada game di sini!!!\nMohon tunggu selesai...');
	let res = await tebakkimia().then(v=> v)
	let soal = res.lambang
	let jawaban = res.unsur
	console.log('Soal: '+soal + '\n' + 'Jawaban: '+jawaban);
	let teks = `*Game Tebak kimia*\n\nNama unsur kimia dari lambang *${soal}* adalah ...\nWaktu: ${q.timeoutgame/1000} detik\n`
	let teks2 = `Waktu berakhir :(\nNama unsur dari lambang ${soal}\n\nAdalah : ${bb(jawaban)}`
	conn.kimia[i] = [
		await repl(teks),
		soal,
		jawaban.toLowerCase(),
		setTimeout(function() {
			if (conn.kimia[i]) repl(teks2);
			delete conn.kimia[i];
		}, q.timeoutgame)
	]
}

export default handle;