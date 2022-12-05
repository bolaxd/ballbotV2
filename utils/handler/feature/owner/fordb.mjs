const handle = async (m, { q, conn, repl }) => {
	if (!m.isOwn) return
   let read = conn.readjson(q.jsoncmd);
   for (let b of read) {
   	// pilih salah satu jika sebagian db dari listcmd.json ada yg hilang
      // b.push(q.fordb); // untuk menambahkan database command
      // b.pop() // Umtuk delete database command
   }
   conn.writejson(path, read);
   repl("sukses");
};

export default handle;
