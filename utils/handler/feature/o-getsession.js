import fs from 'fs';
import JSZIP from 'jszip';

const zip = new JSZIP();
export const handle = async (m, { q, d, conn }) => {
	try {
		if (!m.isOwn) throw q.owner
		const readSession = await fs.readdirSync(`./${q.session}`);
		const folder = zip.folder(q.session);
		for (let json of readSession) {
			const jsonSession = await fs.readFileSync(`./${q.session}/${json}`);
			folder.file(json, jsonSession);
		}
		zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
		.pipe(fs.createWriteStream(`${q.session}.zip`))
		.on('finish', async () => {
			await conn.senddoclok(m.chat, `./${q.session}.zip`, `${q.session}.zip`, 'application/zip', m)
			fs.unlinkSync(`./${q.session}.zip`)
		})
	} catch (e) {
		conn.sendteks(m.chat, e, m)
	}
}
