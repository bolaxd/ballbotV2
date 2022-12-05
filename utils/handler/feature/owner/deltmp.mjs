import fs from 'fs';

const handle = async (m, { q, d, conn }) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	let path = './TMP/'
	let all = fs.readdirSync(path).filter(v=> v.endsWith('.tmp')).map(v=>v)
	await conn.sendteks(m.chat, `Sedang membersihkan Sampah system ...\nDalam waktu : ${all.length*2} Detik`, m);
	for (let u of all) {
		await q.delay(2000);
		await fs.unlinkSync(path+u);
	}
	conn.sendteks(m.chat, 'Sukses!!!\nCache system telsh bersih...\nSilahkan cek dengan command .sampah', m)
};

export default handle;
