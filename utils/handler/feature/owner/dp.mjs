import { unlinkSync } from 'fs';

const handle = async (m, { q, conn }) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	if (!m.query) return conn.sendteks(m.chat, `Salah!!!\nContoh : *.${m.command} owner/bcgc*`, m)
	let path = './utils/handler/feature/'
	await unlinkSync(path+m.query+'.mjs')
	conn.sendteks(m.chat, `Sukses delete di path : ${path + m.query}`, m)
}

export default handle;