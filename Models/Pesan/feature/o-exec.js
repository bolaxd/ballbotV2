import { exec } from 'child_process';
export const handle = async (m, { conn, d }) => {
	if (!m.isOwn) return
	if (!m.query) return
	await conn.sendteks(m.chat, 'Executing...', m)
	try {
		exec(m.query, (e, stdout) => {
			if (e) return conn.sendteks(m.chat, e, d.f1(e, ''));
			if (stdout) return conn.sendteks(m.chat, stdout, d.f1(stdout, ''))
		})
	} catch (e) {
		conn.sendteks(m.chat, e, d.f1(e, ''))
	}
}