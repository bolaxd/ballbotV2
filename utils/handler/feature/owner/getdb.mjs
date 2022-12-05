import { readdirSync, readFileSync, createWriteStream } from 'fs';
import JSZIP from 'jszip';
let path = './utils/db/'

const zip = new JSZIP();
const handle = async (m, { q, conn, d }) => {
	if (!m.isOwn) return repl(q.owner)
	await conn.sendteks(m.chat,`sedang ambil...`,m)
	let _a = readdirSync(path), _b = zip.folder('db')
	for (let _c of _a) {
		let _d = readFileSync(path+_c)
		_b.file(_c, _d)
	}
	zip.generateNodeStream({ type: "nodebuffer", streamFiles: true })
	.pipe(createWriteStream(`./TMP/db.zip`)).on('finish', async () => {
		await conn.senddoclok(m.chat, `./TMP/db.zip`, `db.zip`, `application/zip`, m)
		q.tmp('./TMP/db.zip')
	})
}

export default handle;
