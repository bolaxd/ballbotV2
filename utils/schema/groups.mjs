const handle = async (m, { q, conn, db }) => {
	if (m.isGc) {
		// write default database by bolaxd
		let cari = db.grup.find(v=> v[0] == m.chat);
		let i = db.grup.findIndex(v => v[0] == m.chat);
		// property of groups arrays
		var ban = false; // [1][0]
		var detect = true; // [1][1]
		var link = false; // [1][2]
		var antidel = false; // [1][3]
		var antilink = false; // [1][4]
		var antivn = false; // [1][5]
		var antistik = false; // [1][6]
		var antiimg = false; // [1][7]
		var antivid = false; // [1][8]
		var antibot = false; // [1][9]
		var antiluar = false; // [1][10]
		var antivo = false; // [1][11]
		var autostik = false; // [1][12]
		// indentify to array database
		if (cari) {
			if (!db.grup[i][1].ban) Object.assign(db.grup[i][1], {ban});
			if (!db.grup[i][1].detect) Object.assign(db.grup[i][1], {detect});
			if (!db.grup[i][1].link) Object.assign(db.grup[i][1], {link});
			if (!db.grup[i][1].antidel) Object.assign(db.grup[i][1], {antidel});
			if (!db.grup[i][1].antilink) Object.assign(db.grup[i][1], {antilink});
			if (!db.grup[i][1].antivn) Object.assign(db.grup[i][1], {antivn});
			if (!db.grup[i][1].antistik) Object.assign(db.grup[i][1], {antistik});
			if (!db.grup[i][1].antiimg) Object.assign(db.grup[i][1], {antiimg});
			if (!db.grup[i][1].antivid) Object.assign(db.grup[i][1], {antivid});
			if (!db.grup[i][1].antibot) Object.assign(db.grup[i][1], {antibot});
			if (!db.grup[i][1].antiluar) Object.assign(db.grup[i][1], {antiluar});
			if (!db.grup[i][1].antivo) Object.assign(db.grup[i][1], {antivo});
			if (!db.grup[i][1].autostik) Object.assign(db.grup[i][1], {autostik});
		} else if (!cari) {
			db.grup.push([
				m.chat, 
				{
					ban,
					detect,
					link,
					antidel,
					antilink,
					antivn,
					antistik,
					antiimg,
					antivid,
					antibot,
					antiluar,
					antivo,
					autostik,
				}
			]);
		}
	}
};


export default handle;