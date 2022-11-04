export const handle = async (m, { q, conn }) => {
	if (!m.query) return conn.sendteks(m.chat, 'Silahkan berikan alasan anda menvoting', m)
	
}