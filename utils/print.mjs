import cl from 'lolcatjs';
import ch from 'chalk-animation';
import fg from 'figlet';
cl.options.seed = Math.round(Math.random() * 1000);
cl.options.colors = true;
// Jika anda tidak suka dengan template bawaan anda bisa memakai template anda sendiri
let garis = [
	'╔⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╗', 
	'╚⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╝',
	'•❅───✧',  /*Kiri kanan*/ '✧───❅•'
]
let awalan = ['•≫', 'シ','જ','✾', '✼', '˚❀']
let teks = [
		'Command:',
		'Pesan:',
		'Oleh:',
		'Di Chat:',
		'Waktu:',
		'Di Private Chat',
		'', // INI JIKA DI ISI BAKAL MUNCUL NAMA KAMU
	] 
// READ TO CONSOLE
export default async (m, { conn, q, up, budy, meta }) => {
let p = q.rdm(awalan)
	if (up.key.fromMe) return
	if (!m.isBaileys && !up.messageStubType) {
		cl.fromString(budy.startsWith(m.preff) ? `${p} ${teks[0]} ${q.cut(budy,400)}` : `${p} ${teks[1]} ${q.cut(budy,400) || m.mtype}`)
		cl.fromString(`${p} ${teks[2]} `+m.sender.split('@')[0])
		cl.fromString(m.isGc ? `${p} ${teks[3]} ${meta.subject}` : `${p} ${teks[5]}`)
		cl.fromString(`${p} ${teks[4]} `+new Date().toDateString()+'\n')
	} else if (m.isBaileys && !up.messageStubType) {
		cl.fromString(`${p} ${teks[1]} Tidak diketahui`)
		cl.fromString(`${p} ${teks[2]} BOT LAIN`)
		cl.fromString(m.isGc ? `${p} ${teks[3]} ${meta.subject}` : `${p} ${teks[5]}`)
		cl.fromString(`${p} ${teks[4]} `+new Date().toDateString()+'\n')
	} else if (!m.isBaileys && up.messageStubType) {
		cl.fromString(garis[0])
		cl.fromString(`  ${garis[2]} Notification Update Group ${garis[3]}`)
		cl.fromString(m.isGc ? `${p} ${teks[3]} ${meta.subject}` : `${p} ${teks[5]}`)
		cl.fromString(`${p} ${teks[4]} `+new Date().toDateString())
		cl.fromString(garis[1])
	}
}
export const _ = {
	connect: () => ch.rainbow('Menunggu tersambung ke koneksi server...'),
	cl: () => fg.textSync(teks[6].length <1 ? 'Ballbot' : teks[6], {font: 'Crawford',horizontalLayout: 'default',verticalLayout: 'default',width: 60,whitespaceBreak: true}),
}
// DATA DATA TIME STRING SESUAI DEVELOPER MOZILLA [ yang bagus dan yg gw seneng ]
// .toTimeString()
// .toLocalString()
// .toLocalTimeString()
// .toDateString()
// dll