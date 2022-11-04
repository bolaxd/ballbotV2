export const db = async (m, { q, conn, isNum, bot }) => {
	try {
// Untuk User nya [ otomatis add pas gk ada ]
		let user = conn.db.data.user[m.sender]
		if (typeof user !== 'object') conn.db.data.user[m.sender] = {}
		if (user) {
		if (!isNum(user.lastused)) conn.db.data.user[m.sender].lastused = new Date*1
		if (!isNum(user.afk)) conn.db.data.user[m.sender].afk = 0
		if (!('rafk') in user) conn.db.data.user[m.sender].rafk = []
		if (!('bool') in user) conn.db.data.user[m.sender].bool = false
		} else conn.db.data.user[m.sender] = {
			lastused: new Date*1,
			afk: 0,
			rafk: [],
			bool: false,
		}
	// Group kalo belom ada ini buat bukti
		if (m.isGc) {
			let cht = conn.db.data.chat[m.chat]
			if (typeof cht !== 'object') conn.db.data.chat[m.chat] = {}
			if (cht) {
				if (!isNum(cht.cht)) conn.db.data.chat[m.chat].cht = 0
				if (!('ban') in cht) conn.db.data.chat[m.chat].ban = false
				if (!('detect') in cht) conn.db.data.chat[m.chat].detect = true
				if (!('link') in cht) conn.db.data.chat[m.chat].link = false
				if (!('antidel') in cht) conn.db.data.chat[m.chat].antidel = false
				if (!('antilink') in cht) conn.db.data.chat[m.chat].antilink = false
				if (!('antivn') in cht) conn.db.data.chat[m.chat].antivn = false
				if (!('antistik') in cht) conn.db.data.chat[m.chat].antistik = false
				if (!('antiimg') in cht) conn.db.data.chat[m.chat].antiimg = false
				if (!('antivid') in cht) conn.db.data.chat[m.chat].antivid = false
				if (!('antibot') in cht) conn.db.data.chat[m.chat].antibot = false
				if (!('antiluar') in cht) conn.db.data.chat[m.chat].antiluar = false
				if (!('vote') in cht) conn.db.data.chat[m.chat].vote = []
			} else conn.db.data.chat[m.chat] = {
				cht: 0,
				ban: false,
				detect: true,
				link: false, 
				antidel: false,
				antilink: false,
				antivn: false,
				antistik: false,
				antiimg: false,
				antivid: false,
				antibot: false,
				antiluar: false,
			}
		}
// Bot nya dah auto insert
		let sett = conn.db.data.set[bot]
		if (typeof sett !== 'object') conn.db.data.set[bot] = {}
		if (sett) {
			if (!('update') in sett) conn.db.data.set[bot].update = []
			if (!('public') in sett) conn.db.data.set[bot].public = true
			if (!('call') in sett) conn.db.data.set[bot].call = true
		} else conn.db.data.set[bot] = {
			update: [],
			public: true,
			call: true
		}
	} catch (e) {
		console.log(e)
	}
}