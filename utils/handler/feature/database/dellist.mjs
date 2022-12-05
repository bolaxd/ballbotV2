const handle = async (m, { conn, q, repl, db, bot }) => {
   let [st, nameList] = m.query.split("@");
   if (!st) return repl(`Salah command!!!\nContoh : *.dellist jb-store@Mobile legends`);
   if (!nameList)return repl(`Salah command!!!\nContoh : *.dellist jb-store@Mobile legends`);
   let store = {
      k: st.toLowerCase(),
      b: st.toUpperCase(),
   };
   let i = db.set.findIndex((v) => v[0] == bot);
   if (!db.set[i][1].store[store.k] && !db.set[i][1].store[store.b])
      return repl(`Store yang anda ingin delete listnya tidak ada\nAdd store dengan perintah .cs *nama store*\nAtau cari Nama store di bot ini dengan perintah .liststore`);
   if (!db.set[i][1].store[store.b].creator.includes(m.sender))
      return repl(`Maaf!!!\n\nAnda siapa?\nanda bukan owner dari store ini!!!`);
   if (!db.set[i][1].store[store.k][nameList.toLowerCase()])
      return repl(
         `List yang anda ingin delete di store ${store.b} Tidak ada\nCek list store dengan mengetikan namanya\ncontoh : .drian-store`
      );
   delete db.set[i][1].store[store.k][nameList.toLowerCase()];
   db.set[i][1].store[store.b].update = Date.now();
   repl(`Sukses delete list ${nameList} dari store ${store}`);
};

export default handle;
