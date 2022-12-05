import { getCookie } from 'insta-fetcher';

const handle = async (m, { q, conn, bot }) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	let [ un, pw] = m.query.split('@')
	if (!un) return conn.sendteks(m.chat, `Masukan username ig nya\nContoh: *.${m.command} namaig@katasandi*`)
	if (!pw) return conn.sendteks(m.chat, `Masukan password ig nya\nContoh: *.${m.command} namaig@katasandi*`)
	let res = await getCookie(un.replace(' ',''), pw.replace(' ',''))
	conn.db.data.set[bot].cookie = res
	conn.sendteks(m.chat, `Sukses membuat cookie...`, m);
}

export default handle;