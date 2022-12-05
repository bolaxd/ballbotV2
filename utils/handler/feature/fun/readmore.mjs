const handle = async (m, { q, conn, more, repl }) => {
	let [t1, t2] = m.query.split('|')
	if (!t1) return repl(`Masukan Teks pertama!!!\nContoh: .${m.command} halo sayang aku pengen putus sama kamu | Tapi boong`)
	if (!t2) return repl(`Masukan Teks Kedua!!!\nContoh: .${m.command} halo sayang aku pengen putus sama kamu | Tapi boong`)
	repl(t1+more+t2)
}

export default handle;