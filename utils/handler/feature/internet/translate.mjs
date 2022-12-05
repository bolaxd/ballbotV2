import { translate } from '@vitalets/google-translate-api';
import fs from 'node:fs';

const handle = async (m, { q, conn, repl }) => {
	let [ teks, bhs ] = m.query.split('|')
	if (!teks) return repl(`masukan teksnya!\nContoh .${m.command} halo dunia | en`);
	if (!bhs) return repl(`masukan bahasanya!\nContoh .${m.command} halo dunia | en\nRefrensi bahasa:\n\n${getAllBhs()}`);
	let b = bhs ? bhs.replace(' ', '') : 'id'
	let res = await translate(teks, {to: b})
	repl(`Terjemahan : ${res.raw.sentences[0]?.trans}\nCara baca : ${res.raw.sentences[1]?.translit ? res.raw.sentences[1]?.translit : "tidak diketahui"}\n\nTerjemahan dari ${getBhs(res.raw?.ld_result.srclangs[1] || res.raw?.src)} Ke ${getBhs(b)}`);
}

export default handle;

function getBhs(code) {
	let getCode = JSON.parse(fs.readFileSync('./utils/helper/bahasa.json'));
	let hasil;
	for (let b of getCode) if (b[0] == code) hasil = b[1]
	return hasil;
}
function getAllBhs() {
	let getCode = JSON.parse(fs.readFileSync('./utils/helper/bahasa.json'));
	return getCode.map(v=> `${v[0]} => ${v[1]}`).join('\n')
}