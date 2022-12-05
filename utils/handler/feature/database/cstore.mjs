const handle = async (m, { conn, q, repl, db, bot }) => {
   if (!m.query) return repl(`Masukan Nama store yang ingin anda gunakan!!!`);
   let store = {
      k: m.query.toLowerCase(),
      b: m.query.toUpperCase(),
   };
   let i = db.set.findIndex((v) => v[0] == bot);
   db.set[i][1].store[store.k] = {};
   db.set[i][1].store[store.b] = {};
   db.set[i][1].store[store.b].creator = [m.sender];
   db.set[i][1].store[store.b].date = Date.now();
   db.set[i][1].store[store.b].update = Date.now();
   repl(`Sukses membuat Nama store dengan nama ${m.query} Silahkan anda memanggil store dengan nama store nya\nContoh : .drian-store`);
};

export default handle;
