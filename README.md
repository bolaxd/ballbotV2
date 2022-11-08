<p align="center">
<img src="https://avatars0.githubusercontent.com/u/4674786?s=400&u=2f77d382a4428c141558772a2b7ad3a36bebf5bc&v=4" width="128" height="128"/>
</p>
<p align="center">
<a href="#"><img title="ballbotV2" src="https://img.shields.io/badge/Ballbot%20V2-green?colorA=%23ff0000&colorB=C13584&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/bolaxd"><img title="Autor" src="https://img.shields.io/badge/Author-bolaxd-5851DB.svg?style=for-the-badge&logo=github"></a>
</p>
</p>
<p align="center">
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fbolaxd%2FballbotV2.git&count_bg=%23833AB4&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true"/></a>
<a href="#"><img title="Version" src="https://img.shields.io/github/package-json/v/bolaxd/ballbotV2?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/bolaxd/ballbotV2/followers/"><img title="Followers" src="https://img.shields.io/github/followers/bolaxd?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/bolaxd/ballbotV2/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/bolaxd/ballbotV2?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/bolaxd/ballbotV2/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/bolaxd/ballbotV2?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="#"><img title="MAINTENED" src="https://img.shields.io/badge/MAINTENED-YES-%23833AB4?style=flat-square"/></a>
</p>

### Anjuran :v
Sebelom kamu menggunakan repository ini alangkah baik nya untuk memberi star ke repo ini :)
tapi klo ngga mau juga gpp gamasalah mas :)

### Cara menggunakan Repo ini
Persiapan for termux:
```bash
$ pkg install git
$ pkg install nodejs-lts
$ pkg install imagemagick
$ pkg install ffmpeg
$ git -v
$ nodejs -v
$ npm -v
```
Cara ambil script ini
```bash
$ git clone https://github.com/bolaxd/ballbotV2
$ cd ballbotV2-main
```
Setting dulu di code editor kalian masing masing
```Setting/settings.js```
```js
const config = {
	name: 'bolaxd', //nama sih
	developer: ['6285728625940', '13068016884'], //Nomor owner
	moderator: [], //Nomor mod [kalo ada]
	browser: ['bolaxd', 'safari', '1.0.0'],
	gcbot: ['120363041493745571@g.us'], /* Only ID group */
	thumb: 'https://telegra.ph/file/145c06fa8c8b4ee92b203.jpg',
	thumb2: 'https://telegra.ph/file/7eb1fc815b59e24c07ab0.jpg',
	autoload: 20000, // Load DB [ ini udah Fix coi ]
	sensitive: 0.7, // Kesensitivitas command
	longbc: 7000, // Long BC adalah Penjagaan Broadcast anti banned 
	mingc: 20, // Minimal Bot Join group 
	freeadd: 7, // Selain Owner yang joinin bot ke group [ free add ]
	namedb: 'database', // Nama Database 
```
Ubah Message fail nya ada di Folder setting.js
```Setting/setting.js```
```js
	connect: 'Bot telah tersambung ke Konneksi server Whatsapp web',
	sukses: 'Berhasil :)',
	gagal: 'Kegagalan :(, mohon ulangi command anda\nJika ini salah Mohon report ke owner',
	owner: 'Khususon Owner',
	forgc: 'Untuk di group :]',
	leave: 'Hai kak, Saya diperintahkan Owner untuk keluar dari group ini :)\nMohon maaf ya kak jika bot punya banyak kesalahan :)\nGood bye kak',
	forimg: 'Kirim image lalu dengan caption command / atau kirim image dulu lalu di reply text command',
	forteks: 'Reply atau tag member atau tulis nomor member setelah command',
	teks: 'Reply teks / masukan karakter setelah command',
	admin: 'Kamu bukan orang dalam-_\nKhusus admin',
	botadmin: 'bot bukan orang dalem-_\nAdminin dong',
	active: 'Sebelom nya sudah aktif :v',
	unactive: 'Sebelom nya sudah tidak aktif :v',
	aslink: 'Pasanglah Link setelah command',
	gcouttime: 'Hai Kak, Bot ini masa aktifnya telah habis, Bot akan keluar otomatis',
	linkadm: 'Admin Group tidak mengijinkan link group untuk di share :)',
	notext: 'Teks nya mana?',
	wait: 'Sek Loading...',
	ok: 'Oke Min',
}

export default config;
```

setelah setting di code editor di termux run lah dengan perintah dibawah ini
```bash
$ npm start
```

## Penulis
[![bolaxd](https://github.com/bolaxd.png?size=100)](https://github.com/bolaxd)
## Big Thanks To
[![Amiruldev20](Amiruldev20)](https://github.com/Amiruldev20)
[![Fokusdotid](https://github.com/Fokusdotid.png?size=100)](https://github.com/Fokusdotid)
