const handle = (m, { q, conn, bb }) => {
	let teks = `[				Source Code Bot ini				]\n\n`
		teks += `Kunjungi Github ${q.name} :\n`
		teks += `${q.home}\n`
		teks += `Jangan lupa beri bintang & Follow Akun Github Owner ku yah\n`
	let foot = `Report Jika ada Bug Disini : ${q.bug}`
	let buttons = [
		['Oke min', 'hehe']
		]
	conn.butteks(m.chat, teks, foot, buttons, m)
}

export const cmd = ['script', 'sc']
export default handle;
