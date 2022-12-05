const handle = async (m, { q, conn }) => {
	let kontak = [
		['Mei', q.developer[1], 'instagram : @meisyxz31' ],
		['Iqbal', q.developer[0], 'instagram : @iqblsh77' ],
		];
	await conn.sendkon(m.chat, q.name, kontak, m)
	.catch(v => conn.sendteks(m.chat, q.gagal, m));
}

export default handle;