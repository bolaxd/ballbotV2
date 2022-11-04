export const handle = async (m, { q, conn }) => {
	let kontak = [
		[q.name, q.developer[0], 'Para Persetanan bot' ],
		['Bot', q.developer[1], 'Yo haloo gw orang biasa' ],
		];
	await conn.sendkon(m.chat, q.name, kontak, m)
	.catch(v => conn.sendteks(m.chat, q.gagal, m));
}