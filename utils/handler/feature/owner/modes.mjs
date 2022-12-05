const handle = async (m, { q, conn, bot, repl, db }) => {
   if (!m.isOwn) return repl(q.owner);
   let i = db.set.findIndex((v) => v[0] == bot);
   if (m.args[0] == "group") {
      if (db.set[i][1].group) {
         db.set[i][1].group = false;
         repl("Sukses mematikan mode group!");
      } else if (!db.set[i][1].group) {
         db.set[i][1].group = true;
         repl("Sukses menghidupkan mode group!\nSiapapun yang chat bot di private chat akan diarahkan ke group ballbot kecuali user premium!!!");
      }
   } else if (m.args[0] == "public") {
      if (db.set[i][1].publik) {
         db.set[i][1].publik = false;
         repl("Sukses mengganti nya ke mode Self\nBot cuma bisa di chat oleh Owner sendiri");
      } else if (!db.set[i][1].publik) {
         db.set[i][1].publik = true;
         repl("Sukses mengganti nya ke mode Public\nSemua user dapat chat bot");
      }
   } else if (m.args[0] == "main") {
      if (db.set[i][1].main) {
         db.set[i][1].main = false;
         repl("Sukses mematikan mode maintenance...");
      } else if (!db.set[i][1].main) {
         db.set[i][1].main = true;
         repl("Sukses menghidupkan mode maintenance\nBot only owner");
      }
   } else if (m.args[0] == "antitag") {
      if (db.set[i][1].antitag) {
         db.set[i][1].antitag = false;
         repl("Sukses menghidupkan mode anti tag...");
      } else if (!db.set[i][1].antitag) {
         db.set[i][1].antitag = true;
         repl("Sukses menghidupkan mode anti tag | owner tidak akan mendapatkan tag dari siapapun");
      }
   } else {
      let list = [
         ["Group", `.modes group`, ""],
         ["Public / Self", `.modes public`, ""],
         ["Maintenance", `.modes main`, ""],
         ["Antitag", `.modes antitag`, ""],
      ];
      conn.sendlist(m.chat, `Hai owner!!\n${q.name} silahkan pilih mode nya disini!\nAntitag: ${db.set[i][1].antitag ? "hidup" : "mati"}\nMode: ${db.set[i][1].publik ? "public" : "self"}\nMode group: ${db.set[i][1].group ? "hidup" : "mati"}\nMode maintenance: ${db.set[i][1].main ? 'Hidup' : 'Mati'}`, q.name, list, m);
   }
};

export default handle;
