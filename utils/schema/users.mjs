const handle = async (m, { q, conn, db }) => {
	// write default database by bolaxd
	let cari = db.users.find(v=> v[0] == m.sender);
	let i = db.users.findIndex(v => v[0] == m.sender);
	// property of array
	var win = 0; // [1].win
	var lose = 0; // [1].lose
	var coin = 0; // [1].coin
	var lastclaim = Date.now();  // [1].lastclaim
	var reason = null; // [1].reason
	var lastafk = -1; // [1].lastafk
	var daftar = false
	// indentify user in arrays database
	if (cari) {
		if (!db.users[i][1].win) Object.assign(db.users[i][1], {win});
		if (!db.users[i][1].lose) Object.assign(db.users[i][1], {lose});
		if (!db.users[i][1].coin) Object.assign(db.users[i][1], {coin});
		if (!db.users[i][1].lastclaim) Object.assign(db.users[i][1], {lastclaim});
		if (!db.users[i][1].reason) Object.assign(db.users[i][1], {reason});
		if (!db.users[i][1].lastafk) Object.assign(db.users[i][1], {lastafk});
        if (!db.users[i][1].daftar) Object.assign(db.users[i][1], {daftar});
	// identify not found!
	} else if (!cari) {
		db.users.push([
			m.sender, 
			{
				win,
				lose,
				coin,
				lastclaim,
				reason,
				lastafk,
                daftar
			}
		]);
	}
};


export default handle;