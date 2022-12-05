import { tebakgambar } from '@bochilteam/scraper';

const handle = async (m, { q, conn, d, repl }) => {
	conn.gambare = conn.gambare ? conn.gambare : {}
	let i = m.chat
	if (i in conn.gambare) return repl('Masih ada game trbak gambar yang belom selesai...');
	let res = await tebakgambar().then(v=>v)
	let desc = res.deskripsi
	let jwbn = res.jawaban
	console.log('Deskripsi: '+desc + '\n' + 'Jawaban: '+jwbn);
	conn.gambare[i] = [
			await conn.sendteks(i,`Gambar tersebut terdapat ${desc}\n\nWaktu ${q.timeoutgame/1000} detik`, m, d.f2('',res.img,'')),
			jwbn.toLowerCase(),
			setTimeout(async function() {
				if (i in conn.gambare) {
					await repl(`Waktu habis :)\nJawaban nya adalah : ${conn.gambare[i][1]}`);
					delete conn.gambare[i];
				}
			}, q.timeoutgame+20000)
		]
}

export default handle;