import fs from 'fs';

const handle = async (m, { q, quoted, conn, repl }) => {
	if (!m.isOwn) return repl(q.owner)
	if (!/(imageMessage|videoMessage|audioMessage|stickerMessage)/.test(m.quoted?.mtype)) return repl('Reply gambar / video / audio yang ingin di save ke media bot')
	if (!m.query) return repl('Beri nama file tersebut...')
	let buf = await m.quoted.download()
	let name = m.query.replace(' ', '-')
	let path = /imageMessage/.test(m.quoted?.mtype) ? `./Media/Image/${name}.jpg` : /videoMessage/.test(m.quoted?.mtype) ? `./Media/Video/${name}.mp4` : /audioMessage/.test(m.quoted?.mtype) ? `./Media/Audio/${name}.mp3` : /stickerMessage/.test(m.quoted?.mtype) ? `./Media/Sticker/${name}.webp` : `./Media/Other/${name}.bin`
	await fs.writeFileSync(path, buf)
	repl(`Sukses send to path ${path}\ndengan nama ${name}`)
}

export default handle;