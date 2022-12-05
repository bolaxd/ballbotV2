import { textpro, textproList } from '@bochilteam/scraper';

const handle = async (m, { q, conn, repl }) => {
	let [nama, hasilan, link] = m.query.split('|')
	if (hasilan === 'hasil123') {
		let res = await textpro(link, nama.split(''));
		conn.sendimg(m.chat, res, q.sukses, m)
	} else {
		if (!nama) return repl(`Masukin Nama anda!!`);
		let list = await textproList
		let listAll = list.filter(v=> v.parameters.length == 1).map(v=> [v.title, `.textpro ${nama}|hasil123|${v.title}`, ``]);
		conn.sendlist(m.chat, `Anda memasukan query ${nama}\nSilahkan anda pilih style nya`, q.name, listAll, m);
	}
}

export default handle