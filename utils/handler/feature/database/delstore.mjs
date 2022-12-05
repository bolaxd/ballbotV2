const handle = async (m, { conn, q, repl, db, bot }) => {
   if (!m.query) return repl(`Salah command!!!\nContoh : *.delstore jb-store`);
   let store = {
      k: m.query.toLowerCase(),
      b: m.query.toUpperCase(),
   };
   let i = db.set.findIndex((v) => v[0] == bot);
   if (!db.set[i][1].store[store.k] && !db.set[i][1].store[store.b])
      return repl(`Store yang anda ingin delete listnya tidak ada\nAdd store dengan perintah .cs *nama store*\nAtau cari Nama store di bot ini dengan perintah .liststore`);
   if (!db.set[i][1].store[store.b].creator.includes(m.sender))
      return repl(`Maaf!!!\n\nAnda siapa?\nanda bukan owner dari store ini!!!`);
   delete db.set[i][1].store[store.k];
   delete db.set[i][1].store[store.b];
   repl(`Sukses delete store : ${store.k} dari database bot ini`);
};

export default handle;
