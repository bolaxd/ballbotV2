import axios from 'axios';

const handle = async (m, { q, conn, budy, repl, mime }) => {
	if (m.isPc) {
		if (m.fromMe) return
		if (m.command) return
		if (/image/.test(mime)) return repl(['Apaan tuh kak?', 'gambar apa tuh?','uytt...','apaan kak?','itu gambar apa?'].rendem())
		if (/video/.test(mime)) return repl(['Apaan tuh kak?','ih pasti video bokep ya?','ihh aku ngerii sama videonya','video apaan tuh kak?','gw jadi ngerii'].rendem())
		if (/audio/.test(mime)) return repl(['huum kak','iya dehh','iya kak', 'mei tau kok'].rendem())
		if (/protocolMessage/.test(m.mtype)) return conn.sendteks(m.chat, ['kenapa dihapus?','ihh kok dihapus?','ahh gitu kamu.. main rahasiaan','ahh biar lh jadi rahasia','ahh kmu mah gitu suka delete chat'].rendem())
		let teks = encodeURIComponent(budy)
		if (teks.length >= 1000) return repl(`Mei Cape bacanya :(`)
		// console.log(teks);
		let { data } = await axios.get(`https://api.simsimi.net/v2/?text=${teks}&lc=id`)
		if ( data.success == 'Ig: Febbyetitania') return conn.sendteks(m.chat, 'follow ig ku dong : meisyxz31')
		conn.sendteks(m.chat, data.success)
	}
}

export default handle;