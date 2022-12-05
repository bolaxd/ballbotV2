import { asahotak } from '@bochilteam/scraper';

const handle = async (m, { conn, q, d, bb, repl }) => {
	conn.ngotak =  conn.ngotak ? conn.ngotak : {}
	let i = m.chat
	if (i in conn.ngotak) return repl('Masih ada game di sini!!!\nMohon tunggu selesai...');
	let res = await asahotak().then(v=> v)
	let soal = res.soal
	let jawaban = res.jawaban
	console.log('Soal: '+soal + '\n' + 'Jawaban: '+jawaban);
	let teks = `*Game Asah Otak*\n\nSilahkan jawab soal ini:\n${soal}\nWaktu: ${q.timeoutgame/1000} detik\n`
	let teks2 = `Waktu berakhir :(\nJawaban dari soal :\n\n${bb(soal)}\n\nAdalah : ${bb(jawaban)}`
	conn.ngotak[i] = [
		await repl(teks),
		soal,
		jawaban.toLowerCase(),
		setTimeout(function() {
			if (conn.ngotak[i]) repl(teks2);
			delete conn.ngotak[i];
		}, q.timeoutgame)
	]
}

export default handle;