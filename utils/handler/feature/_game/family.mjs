import simi from 'similarity';
let sensitive = 0.75
const handle = async (m, { q, conn, bb, budy, repl }) => {
	let i = m.chat
	conn.family = conn.family ? conn.family : {};
	conn.addfamily = conn.addfamily ? conn.addfamily : {};
	if (i in conn.family) {
		if (conn.addfamily[i][2].includes(budy) && conn.addfamily[i][0][conn.addfamily[i][3]]) {
			repl('');
			clearInterval(conn.family[i][1]);
			conn.family[i].pop()
			if (conn.addfamily[i][3] <= conn.addfamily[i][0].length) {
				let index = conn.addfamily[3];
				conn.family[i].push(setInterval(async() => {
					if (conn.family[i]) {
						await repl(`Waktu habis!!!\n\n@${conn.addfamily[i][0][index]}`,m, {mentions: [conn.addfamily[i][0][index]]});
						conn.addfamily[i][3]++
						await q.delay(1000);
						if (conn.addfamily[i][3] >= conn.addfamily[i][0].length) {
							clearInterval(conn.family[i][1]);
							repl(`Jawaban tidak selesai!!\nSoal : ${conn.addfamily[i][1]}\n\n${conn.addfamily[i][2].join('\n')}`);
							delete conn.addfamily[i];
							delete conn.family[i];
						} else await repl(`Giliran kamu : @${conn.addfamily[i][0][index]}\nJawab lah pertanyaan ini:\n${bb(conn.addfamily[i][1])}\n\nAda Opsi ${conn.addfamily[i][2].length} Jawaban\nWaktu : ${q.timeoutgame/1000} Detik`, m, {mentions: [conn.addfamily[i][0][index]]});
					}
				}, q.timeoutgame));
			}
		}
	}
}

export default handle;