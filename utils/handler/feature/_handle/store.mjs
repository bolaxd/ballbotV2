const handle = async (m, { q, conn, bot, db }) => {
   let i = db.set.findIndex((v) => v[0] == bot);
   if (!db.set[i][1].store[m.command.toLowerCase()]) return;
   if (db.set[i][1].store[m.command.toLowerCase()]) {
      let b = Object.values(db.set[i][1].store[m.command.toLowerCase()]);
      let list =
         b.length !== 0
            ? b.map((v) => [
                 v.tilte,
                 `.store ${m.command.toLowerCase()}@${v.tilte}`,
                 v.des ? v.des : "",
              ])
            : [
                 [
                    "belom ada list disini",
                    "",
                    "perintah add list : *.addlist namastore@namalist@namadeskripsi* \nLakukan lah sambil mereply pesan isi",
                 ],
              ];
      conn.sendlist(
         m.chat,
         `List message dari ${m.command}\n`,
         q.name,
         list,
         m
      );
   }
};

export default handle;
