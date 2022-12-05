const handle = async (m, { q, conn, isAdmin, isBotAdmin, members, repl, db, bot }) => {
   if (!m.isGc) return repl(q.forgc);
   if (!isAdmin) return repl(q.admin);
   let tag = members.map((v) => v.id);
   let i = db.set.findIndex((v) => v[0] == bot);
   let ments = db.set[i][1].antitag? members.map((v) => v.id).filter((v) => !q.developer.map((a) => a + q.idwa).includes(v)): members.map((v) => conn.createJid(v.id));
   let pesan = `Pesan: ${m.query ? m.query : "Tidak ada"}\n`;
   tag.map((v) => (pesan += `@${v.split("@")[0]}\n`));
   conn.sendteks(m.chat, pesan, m, { mentions: ments });
};

export default handle;
