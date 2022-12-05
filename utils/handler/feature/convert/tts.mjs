let baseUrl = 'https://saipulanuar.ga/api/'
let api = 'G9ak9YmL'

const handle = async (m, { q, conn, repl }) => {
	if (!m.query) return repl(q.notext);
	let teks = encodeURIComponent(m.query)
	conn.sendMessage(m.chat, {audio: await q.getbuff(`${baseUrl}text-to-audio/tts?text=${teks}&idbahasa=id&apikey=${api}`), ptt: true}, {quoted: m})
}

export default handle