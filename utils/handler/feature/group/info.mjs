const handle = async (m, { q, conn, meta, isBotAdmin, isAdmin, repl, db }) => {
   if (!m.isGc) return repl(q.forgc);
   let i = db.grup.findIndex((v) => v[0] == m.chat);
   if (m.query == "link") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (isAdmin) {
         conn
            .groupInviteCode(m.chat)
            .then((v) => repl(`Link Group\n\nhttps://chat.whatsapp.com/${v}`))
            .catch((e) => repl(q.gagal));
      } else if (!isAdmin) {
         if (!db.grup[i][1].link) return repl(q.linkadm);
         conn
            .groupInviteCode(m.chat)
            .then((v) => repl(`Link Group\n\nhttps://chat.whatsapp.com/${v}`))
            .catch((e) => repl(q.gagal));
      }
   } else if (m.query == "revoke") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      conn
         .groupRevokeInvite(m.chat)
         .then((v) => repl(q.sukses))
         .catch((v) => repl(q.gagal));
   } else if (m.query == "grop") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (meta.announce) {
         conn
            .groupSettingUpdate(m.chat, "not_announcement")
            .then((v) => repl("Sukses membuka group ini..."))
            .catch((v) => repl(q.gagal));
      } else if (!meta.announce) {
         conn
            .groupSettingUpdate(m.chat, "announcement")
            .then((v) => repl("Sukses menutup group ini..."))
            .catch((v) => repl(q.gagal));
      }
   } else if (m.query == "info") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (!meta.restrict) {
         conn
            .groupSettingUpdate(m.chat, "locked")
            .then((v) => repl("Sukses menutup edit info group..."))
            .catch((v) => repl(q.gagal));
      } else if (meta.restrict) {
         conn
            .groupSettingUpdate(m.chat, "unlocked")
            .then((v) => repl("Sukses membuka edit info group..."))
            .catch((v) => repl(q.gagal));
      }
   } else if (m.query == "ban") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].ban) {
         db.grup[i][1].ban = false;
         repl("Bot sekarang di unban di chat ini...");
      } else if (!db.grup[i][1].ban) {
         db.grup[i][1].ban = true;
         repl("Bot sekarang di ban di chat ini...");
      }
   } else if (m.query == "detect") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].ban) {
         db.grup[i][1].detect = false;
         repl("Sukses mematikan detect group...");
      } else if (!db.grup[i][1].detect) {
         db.grup[i][1].detect = true;
         repl("Sukses menghidupkan detect group...");
      }
   } else if (m.query == "linkgc") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].link) {
         db.grup[i][1].link = false;
         repl("Link group ini sekarang hanya admin yang dapat ambil...");
      } else if (!db.grup[i][1].link) {
         db.grup[i][1].link = true;
         repl("Link group ini sekarang dapat di ambil oleh member biasa...");
      }
   } else if (m.query == "antilink") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].antilink) {
         db.grup[i][1].antilink = false;
         repl("anti link sekarang tidak aktif...");
      } else if (!db.grup[i][1].antilink) {
         db.grup[i][1].antilink = true;
         repl("anti link sekarang aktif...");
      }
   } else if (m.query == "antivn") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].antivn) {
         db.grup[i][1].antivn = false;
         repl("anti VN sekarang tidak aktif...");
      } else if (!db.grup[i][1].antivn) {
         db.grup[i][1].antivn = true;
         repl("anti VN sekarang aktif...");
      }
   } else if (m.query == "antistik") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].antistik) {
         db.grup[i][1].antistik = false;
         repl("anti Stiker sekarang tidak aktif...");
      } else if (!db.grup[i][1].antistik) {
         db.grup[i][1].antistik = true;
         repl("anti Stiker sekarang aktif...");
      }
   } else if (m.query == "antivid") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].antivid) {
         db.grup[i][1].antivid = false;
         repl("anti Video sekarang tidak aktif...");
      } else if (!db.grup[i][1].antivid) {
         db.grup[i][1].antivid = true;
         repl("anti Video sekarang aktif...");
      }
   } else if (m.query == "antiimg") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].antiimg) {
         db.grup[i][1].antiimg = false;
         repl("anti Image sekarang tidak aktif...");
      } else if (!db.grup[i][1].antiimg) {
         db.grup[i][1].antiimg = true;
         repl("anti Image sekarang aktif...");
      }
   } else if (m.query == "antibot") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].antibot) {
         db.grup[i][1].antibot = false;
         repl("anti Bot sekarang tidak aktif...");
      } else if (!db.grup[i][1].antibot) {
         db.grup[i][1].antibot = true;
         repl("anti Bot sekarang aktif...");
      }
   } else if (m.query == "antiluar") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].antiluar) {
         db.grup[i][1].antiluar = false;
         repl("anti nomor luar sekarang tidak aktif...");
      } else if (!db.grup[i][1].antiluar) {
         db.grup[i][1].antiluar = true;
         repl("anti nomor luar sekarang aktif...");
      }
   } else if (m.query == "autostik") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].autostik) {
         db.grup[i][1].autostik = false;
         repl("Auto stiker sekarang tidak aktif...");
      } else if (!db.grup[i][1].autostik) {
         db.grup[i][1].autostik = true;
         repl("Auto stiker sekarang aktif...");
      }
   } else if (m.query == "antivo") {
      if (!isBotAdmin) return repl(q.botadmin);
      if (!isAdmin) return repl(q.admin);
      if (db.grup[i][1].antivo) {
         db.grup[i][1].antivo = false;
         repl("Anti View Once sekarang tidak aktif...");
      } else if (!db.grup[i][1].antivo) {
         db.grup[i][1].antivo = true;
         repl("Anti View Once sekarang aktif...");
      }
   } else {
      let teks = `INFO GROUP \n\n`;
      teks += `Nama Group: *${meta.subject}*\n`;
      teks += `Members: *${meta.size}*\n`;
      teks += `Pembuat Group: *${meta.owner?.split("@")[0]??"Kosong"}*\n`;
      teks += `Status Anda: *${
         isAdmin ? "Orang dalam" : "Bukan orang dalam"
      }*\n`;
      teks += `Edit info: *${
         meta.restrict ? "Hanya admin" : "Semua member"
      }*\n`;
      teks += `Kirim pesan: ${
         meta.announce ? "Hanya admin" : "Semua member"
      }\n`;
      teks += `Ban group: *${db.grup[i][1].ban ? "iya" : "tidak"}*\n`;
      teks += `Detect Group: *${db.grup[i][1].detect ? "Online" : "Offline"}*\n`;
      teks += isAdmin
         ? `Bagikan link Group: *${db.grup[i][1].link ? "Boleh" : "Jangan"}*\n`
         : ``;
      teks += `Anti link: *${db.grup[i][1].antilink ? "hidup" : "mati"}*\n`;
      teks += `Anti VN: *${db.grup[i][1].antivn ? "hidup" : "mati"}*\n`;
      teks += `Anti Sticker: *${db.grup[i][1].antistik ? "hidup" : "mati"}*\n`;
      teks += `Anti Video: *${db.grup[i][1].antivid ? "hidup" : "mati"}*\n`;
      teks += `Anti Image: *${db.grup[i][1].antiimg ? "hidup" : "mati"}*\n`;
      teks += `Anti Bot: *${db.grup[i][1].antibot ? "hidup" : "mati"}*\n`;
      teks += `Anti Nomor Luar: *${db.grup[i][1].antiluar ? "hidup" : "mati"}*\n`;
      teks += `Anti View Once: *${db.grup[i][1].antivo ? "hidup" : "mati"}*\n`;
      teks += `Auto stiker: *${db.grup[i][1].autostik ? "hidup" : "mati"}*\n`;
      let list = [["Link Group ini", ".info link", "Link group whatsapp ini"]];
      if (isAdmin) {
         list.push(
            [
               "Reset link grup",
               ".info revoke",
               "Reset atau ganti link group jni dengan yang baru",
            ],
            [
               "Buka/Tutup Edit info",
               ".info info",
               "Beri akses/tidak member untuk mengedit info group",
            ],
            [
               "Buka/Tutup Group",
               ".info grop",
               "Beri akses/tidaknya member untuk mengirim pesan ke group",
            ],
            [
               "Matikan/Hidupkan Ban group",
               ".info ban",
               "Bot akan dibisukan di dalam group jika opsi ini dihidupkan",
            ],
            [
               "Matikan/Hidupkan Detect group",
               ".info detect",
               "Bot akan memberikan deteksi perubahan group jika dihidupkan",
            ],
            [
               "Beri akses/tidak link group",
               ".info linkgc",
               "Bot tidak akan memberikan link group kepada member biasa jika opsi ini di hidupkan",
            ],
            [
               "Matikan/Hidupkan antilink",
               ".info antilink",
               "matikan/Hidupkan larangan member untuk share link gc lain",
            ],
            [
               "Matikan/Hidupkan anti VN",
               ".info antivn",
               "matikan/hidupkan larangan member untuk VN di group",
            ],
            [
               "Matikan/hidupkan anti stiker",
               ".info antistik",
               "matikan/hidupkan larangan member untuk kirim stiker di group",
            ],
            [
               "Matikan/hidupkan anti Gambar",
               ".info antiimg",
               "matikan/hidupkan larangan member untuk kirim gambar di group",
            ],
            [
               "Matikan/hidupkan anti Video",
               ".info antivid",
               "matikan/hidupkan larangan member untuk kirim video di group",
            ],
            [
               "Matikan/hidupkan anti bot",
               ".info antibot",
               "terima semua bot yang masuk ke group selain bot ini jika opsi ini dihidupkan",
            ],
            [
               "Matikan/hidupkan anti Nomor luar",
               ".info antiluar",
               "Bot akan menolakan user Nomor luar yang join jika opsi ini dihidupkan",
            ],
            [
               "Matikan/hidupkan anti View Once",
               ".info antivo",
               "Bot akan meneruskan pesan view once ke media jika opsi ini dihidupkan",
            ],
            [
               "Hidupkan/Matikan auto stiker",
               ".info autostik",
               "Bot akan membuat stiker otomatis ketika member mengirim gambar / video jika opsi ini dihidupkan",
            ]
         );
      }
      conn.sendlist(m.chat, teks, q.name, list, m);
   }
};

export default handle;
