import fs from 'fs';
import JSZIP from 'jszip';

const zip = new JSZIP();

const handle = async (m, { q, d, conn }) => {
	try {
		if (!m.isOwn) throw q.owner
		await conn.sendteks(m.chat,`sedang ambil...`,m)
		const readSession = await fs.readdirSync(`./${q.session}`);
		const folder = zip.folder(q.session);
		for (let json of readSession) {
			const jsonSession = await fs.readFileSync(`./${q.session}/${json}`);
			folder.file(json, jsonSession);
		}
		zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
		.pipe(fs.createWriteStream(`./TMP/${q.session}.zip`))
		.on('finish', async () => {
			await conn.senddoclok(m.chat, `./TMP/${q.session}.zip`, `${q.session}.zip`, 'application/zip', m)
			q.tmp(`./TMP/${q.session}.zip`)
		})
	} catch (e) {
		conn.sendteks(m.chat, e, m)
	}
}

export default handle;
