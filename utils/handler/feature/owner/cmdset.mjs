const handle = async (m, { q, conn, repl, db }) => {
   if (!m.isOwn) return repl(q.owner);
   let [cm, pth] = m.query.split("@");
   if (!cm) return repl(`Masukan dengan benar!\nContoh : ${m.command} command@pathnya`);
   if (!pth) return repl(`Masukan dengan benar!\nContoh : ${m.command} command@pathnya`);
   let cari = db.cmd.find((v) => v[0] == cm);
   if (!cari) {
      db.cmd.push([cm, pth, q.fordb]);
      conn.writejson(q.jsoncmd, db.cmd);
      repl(`Sukses add command ${cm} dengan path ${pth}`);
   } else if (cari) {
      let position = db.cmd.indexOf(cari);
      db.cmd.splice(position, 1);
      conn.writejson(q.jsoncmd, db.cmd);
      repl(`Sukses delete command ${cm} dengan path ${pth}\n\n`);
   }
};

export default handle;
