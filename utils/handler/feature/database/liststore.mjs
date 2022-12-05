const handle = async (m, { q, conn, bot, db }) => {
	let i = db.set.findIndex((v) => v[0] == bot);
    let vibe = Object.keys(db.set[i][1].store)
	let but = vibe.length !== 0 ? vibe.filter(v=> v.includes(v.toUpperCase())).map(v=> [v, `.${v.toLowerCase()}`, `Dibuat oleh : ${db.set[i][1].store[v.toUpperCase()].creator.map(v=>v.split('@')[0]).join(' - ')}. |  Dibuat pada : ${q.time(new Date()*1 - db.set[i][1].store[v.toUpperCase()].date)} yang lalu | Di update pada : ${q.time(new Date()*1 - db.set[i][1].store[v.toUpperCase()].update)}`]) : [['Belum ada store yang terdaftar', '', q.name]]
	conn.sendlist(m.chat, `List Message Mei Botz >>_<<`, q.name, but, m);
};

export default handle;