import { tebakbendera } from '@bochilteam/scraper';

const handle = async (m, { q, conn, d, repl }) => {
	conn.bendera = conn.bendera ? conn.bendera : {}
	let i = m.chat
	if (i in conn.bendera) return repl('Masih ada game di sini...')
	let res = await tebakbendera().then(_=>_)
	let jwbn = res.name 
	console.log('Jawaban: '+jwbn);
	conn.bendera[i] = [
			await conn.sendimg(i, res.img, `Coba tebak bendera ini bendera negara mana?\nWaktu: ${q.timeoutgame/1000} Detik`, m),
			jwbn.toLowerCase(),
			setTimeout(async function() {
				if (i in conn.bendera) {
					await repl(`Waktu habis :(\nJawaban nya adalah : ${conn.bendera[i][1]}`)
					delete conn.bendera[i];
				}
			}, q.timeoutgame)
		]
};

export default handle;