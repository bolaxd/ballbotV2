import fetch from 'node-fetch';

const handle = async (m, { q, conn, repl }) => {
	if (!m.args[0]) return repl(`Contoh : .${m.command} https://instagram.com/iqblsh77`)
	if (!/^https?:\/\//.test(m.args[0])) return repl(`Masukan URL yang valid!!!`)
	let res = await (await fetch(`https://tinyurl.com/api-create.php?url=${m.args[0]}`)).text()
	repl(`Url Short : ${res}\nUrl Asli : ${m.args[0]}\n\nShort url by tinyurl`)
}

export default handle;