const handle = async (m, { q, conn, db, bot, repl }) => {
	if (!m.isOwn) return repl(q.owner)
   let [_a, _b] = m.query.split("|");
   if (!_a) return repl(`Contoh : ${m.command} nama spack stiker | Nama mu`);
   if (!_b) return repl(`Contoh : ${m.command} nama spack stiker | Nama mu`);
   let i = db.set.findIndex((v) => v[0] == bot);
   db.set[i][1].pack = _a;
   db.set[i][1].auth = _b;
   repl(`Sukses atur exif stiker dengan nama : ${_a} dan author : ${_b}`);
};

export default handle;