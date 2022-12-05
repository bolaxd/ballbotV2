const handle = async (m, { conn, q, repl, db, bot }) => {
   if (!m.quoted && !m.query)
      return repl(
         `Salah command!!!\nContoh : *.addlist jb-store@Mobile legends@Ini adalah store mobile legends,* Sambil mereply isian list nya`
      );
   let [st, nameList, desc] = m.query.split("@");
   if (!st)
      return repl(
         `Salah command!!!\nContoh : *.addlist jb-store@Mobile legends@Ini adalah store mobile legends,* Sambil mereply isian list nya`
      );
   if (!nameList)
      return repl(
         `Salah command!!!\nContoh : *.addlist jb-store@Mobile legends@Ini adalah store mobile legends,* Sambil mereply isian List nya`
      );
   let store = {
      k: st.toLowerCase(),
      b: st.toUpperCase(),
   };
   let i = db.set.findIndex((v) => v[0] == bot);
   if (!db.set[i][1].store[store.k] && !db.set[i][1].store[store.b])
      return repl(
         `Store yang anda ingin add listnya tidak ada\nAdd store dengan perintah .cs *nama store*\nAtau cari Nama store di bot ini dengan perintah .liststore`
      );
   if (!db.set[i][1].store[store.b].creator.includes(m.sender))
      return repl(
         `Maaf!!!\n\nAnda siapa?\nanda bukan owner dari store ini!!!`,
         m
      );
   db.set[i][1].store[store.k][nameList.toLowerCase()] = {};
   db.set[i][1].store[store.k][nameList.toLowerCase()].tilte =
      nameList.toLowerCase();
   db.set[i][1].store[store.k][nameList.toLowerCase()].des = desc;
   db.set[i][1].store[store.k][nameList.toLowerCase()].isi = m.quoted.text;
   db.set[i][1].store[store.b].update = Date.now();
   repl(
      `Sukses add list ke store ${store.k} dengan Nama list ${nameList}\n${
         desc ? `Dengan Deskripsi : ${desc}` : ""
      }`
   );
};

export default handle;
