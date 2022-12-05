import { toUrl } from '../../../util/convert-media.js';

const handle = async (m, { q, conn, quoted, mime, repl }) => {
	if (!/image/.test(mime)) return repl('Upload lah gambar!');
	let dl = await quoted.download()
	let res = await toUrl(dl)
	repl(res)
}

export default handle;