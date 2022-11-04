
export default {
	name: 'bolaxd', //nama sih
	developer: ['6285728625940', '13068016884'], //Nomor owner
	moderator: [], //Nomor mod [kalo ada]
	browser: ['bolaxd', 'safari', '1.0.0'],
	longqr: 50000, // DURASI LAMA QR
	gcbot: ['120363041493745571@g.us'], /* Only ID group */
	thumb: 'https://telegra.ph/file/145c06fa8c8b4ee92b203.jpg',
	thumb2: 'https://telegra.ph/file/7eb1fc815b59e24c07ab0.jpg',
	autoload: 20000, // Load DB [ ini udah Fix coi ]
	sensitive: 0.75, // Kesensitivitas command
	longbc: 7000, // Long BC adalah Penjagaan Broadcast anti banned 
	mingc: 20, // Minimal Bot Join group 
	freeadd: 7, // Selain Owner yang joinin bot ke group [ free add ]
	namedb: 'database', // Nama Database 
	session: 'Sessions', // Nama Session Folder nyaa [ Ini bakalan jadi Folder bukan file ]
	api: 'https://malesin.xyz/', // Api malesin
	
	// FAIL MESSAGES
	 //INI UBAH SAJA SESUAI KEBUTUHAN [KALO BISA DITAMBAHIN]
	connect: 'Bot telah tersambung ke Konneksi server Whatsapp web',
	sukses: 'Berhasil :)',
	gagal: 'Kegagalan :(, mohon ulangi command anda\nJika ini salah Mohon report ke owner',
	owner: 'Fitur ini khusus owner bot ini',
	moderr: 'Fitur ini khusus moderator bot ini',
	forgc: 'Fitur ini untuk di group',
	forpc: 'Fitur ini untuk di Private chat',
	leave: 'Hai kak, Saya diperintahkan Owner untuk keluar dari group ini :)\nMohon maaf ya kak jika bot punya banyak kesalahan :)\nGood bye kak',
	forimg: 'Kirim image lalu dengan caption command / atau kirim image dulu lalu di reply text command',
	forteks: 'Reply atau tag member atau tulis nomor member setelah command',
	teks: 'Reply teks / masukan karakter setelah command',
	admin: 'Kamu bukan orang dalam-_\nKhusus admin',
	botadmin: 'bot bukan orang dalem-_\nAdminin dong',
	active: 'Sebelom nya sudah aktif :v',
	unactive: 'Sebelom nya sudah tidak aktif :v',
	aslink: 'Pasanglah Link setelah command',
	query: 'Masukan kuery / kata kuncinya setelah command',
	flink: 'link yang anda masukan tidak valid',
	gcouttime: 'Hai Kak, Bot ini masa aktifnya telah habis, Bot akan keluar otomatis',
	linkadm: 'Admin Group tidak mengijinkan link group untuk di share :)',
	notext: 'Teks nya mana?',
	wait: 'Sek Loading...',
	ok: 'Oke Min',
	// SET WELLCOME DEFAULT
	// @sub @user @admin @jmlh
	fsub: '@admin Telah mengubah Subject group menjadi @sub', 
	fppgc: '@admin Telah mengubah Foto profile group',
	fbgc: '@admin Telah membuka Group ini, Member sekarang dapat mengirim pesan ke group ini',
	ftgc: '@admin Telah menutup Group ini, Member sekarang tidak dapat mengirim pesan ke group ini',
	fbinp: '@admin Telah mengubah setelan group ini, Member sekarang dapat mengedit info group ini',
	ftinp: '@admin Telah mengubah setelan group ini, Member sekarang tidak dapat mengedit info group ini',
	fpm: '@admin Telah menaikan jabatan @user menjadi admin di group ini',
	fdm: '@admin Telah menurunkan jabatan @user menjadi member biasa di group ini',
	faddadmin: '@admin Telah menambahkan @user kedalam group ini\nKatakan hai kepada dia',
	faddlink: '@user Telah bergabung ke group ini menggunakan tautan\nKatakan Hai pada dia :)',
	faddinv: '@user Telah bergabung dengan group menggunakan undangan bot',
	fout: '@user Tersebut Telah keluar dari group ini :(\nKatakan Bye kepada user tersebut',
	fkick: '@admin Telah mengeluarkan @user dari Group ini :v\nYahh beban group telah keluar dri group',
	fephe: '@admin Telah menetapkan pesan sementara pada group ini @jmlh',
	fofephe: '@admin Telah mematikan pesan sementara pada group ini',
	fownerjoin: 'Owner Bot ini telah bergabung dengan tautan\nBeri salam dia dan hormat kepada dia :)',
	// Aesthetic
	tit: (teks)=> '❛ ━━ ･ ❪ ' +teks+ ' ❫ ･ ━━ ❜', 
	cmd: (teks)=> '╞✧' +teks, 
	sub: (teks)=> '╞┈••✦' +teks, 
	a4: '╔══ஓ ๑ ♡ ๑ ஓ══╗', 
	a5: '╚══ஓ ๑ ♡ ๑ ஓ══╝', 
	a6: '─┉┈◈◉◈┈┉', 
	// males ngetik @s.wangsaf atau @g.us
	// Dibawah ini jangan di ubah bang
	idwa: '@s.whatsapp.net',
	idgc: '@g.us',
	idst: 'status@broadcast',
	home: 'https://github.com/bolaxd/ballbot-v2#readme',
	bug: 'https://github.com/bolaxd/ballbot-v2/issues',
	video: 'https://github.com/bolaxd/store-All/blob/main/hehe.mp4',
	
	// Ini Function [ Jangan di ganti yaah :) ]
	delay: async(ms)=>{return new Promise(resolve=>setTimeout(resolve, ms))},
	rb: (nominal)=>{var numb = nominal.toString();var sisa=numb.length % 3;var rupe=numb.substr(0, sisa);var ribu=numb.substr(sisa).match(/\d{3}/g);let heh;if(ribu)heh=sisa?',':'';rupe+=heh+ribu.join(',');return rupe},
	url: (url)=>{return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))},
	rdm: (array)=>{return array[Math.floor(Math.random() * array.length)]},
	cut: (teks, pnjg) => teks.substr(0, pnjg) + '<More '+teks.length - pnjg+' Character>',
	time: (times) => {const seconds = Math.floor((times / 1000) % 60), minutes = Math.floor((times / (60 * 1000)) % 60), hours = Math.floor((times / (60 * 60 * 1000)) % 24), days = Math.floor((times / (24 * 60 * 60 * 1000)));return ((days ? `${days} Hari ` : '') + (hours ? `${hours} Jam ` : '') +(minutes ? `${minutes} Menit ` : '') +(seconds ? `${seconds} Detik` : '')).trim()}
	
}
