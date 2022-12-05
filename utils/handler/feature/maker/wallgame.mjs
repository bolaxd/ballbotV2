let api = 'G9ak9YmL'
let baseUrl = 'https://saipulanuar.ga/api/'

const handle = async (m, { q, conn }) => {
	let buff = await q.getbuff(`${baseUrl}maker/gammer?apikey=${api}`)
	conn.sendimgbuf(m.chat, buff, q.sukses, m)
}

export default handle;