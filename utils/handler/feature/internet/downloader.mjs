import { twitterdl,
		twitterdlv2, 
		mediafiredl,
		facebookdl,
		facebookdlv2,
		facebookdlv3,
		savefrom,
		youtubedl,
		youtubedlv2,
		youtubedlv3,
	} from '@bochilteam/scraper';
import axios from 'axios';
import { format } from 'util';
import { extract } from 'zs-extract';
import { lookup } from 'mime-types';
import { ytv, yta } from '../../../util/downloader.mjs';
let baseUrl = 'https://saipulanuar.ga/api/'
let api = 'G9ak9YmL'
let regexgh = /(?:https?|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
const handle = async (m, { q, d, conn, bb, repl }) => {
	if (m.args[0] == 'download2345') {
		await repl(bb(q.wait))
		if (/vid/.test(m.args[1])) {
				conn.sendvid(m.chat, m.args[2], q.sukses, m)
		} else if (/music/.test(m.args[1])) {
	conn.sendMessage(m.chat, {audio: {url: m.args[2]}, mimetype: 'audio/mp4'}, {quoted: m})
		} else if (/doc/.test(m.args[1])) {
				// doc name mime
				conn.senddoc(m.chat, m.args[4], m.args[3], m.args[2], m)
		}
	} else
	if (/^.*instagram/i.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let { data } = await axios.get(`${baseUrl}downloader/instagram?url=${m.args[0]}&apikey=${api}`)
		/*for (let res of data.result) {
			let b = Object.keys(res)
			if (/post/.test(b) && /jpg/.test(res[b]?.type)) conn.sendimg(m.chat, res[b]?.url, data.result?.title, m)
			if (/post/.test(b) && /mp4/.test(res[b]?.type)) conn.sendimg(m.chat, res[b]?.url, data.result?.title, m)
		}*/ 
repl(format(data))
	} else
	// if (/^.*(fb.watch|facebook.com|fb.gg)/i.test(m.args[0])) {
	// 	await repl(bb('Sedang menginisialisasi link...'))
	// 	let res = await facebookdl(m.args[0]).catch(async _ => await facebookdlv2(m.args[0]).catch(async _ => await facebookdlv3(m.args[0]).catch(async _ => await savefrom(m.args[0]))))
	// 	console.log(res)
	// 	// conn.sendvid(m.chat, res.url, q.sukses, m)
	// } else
	if (/^.*zippyshare/i.test(m.args[0])) {
		if (!args[0].includes('zippyshare.com/v')) return 
		await repl(q.wait)
		let res = await extract(args[0])
		let mimetype = await lookup(res.download)
		let but = [['Download Dokument', `.download download2345 doc ${mimetype} ${res.filename} ${res.download}`]]
		conn.butteks(m.chat, `Sukses mendapatkan url...\n\nNama file : ${res.filename}\nExt : ${mimetype}\nLink result : ${res.download}`, q.name, but, m)
		
	} else
	if (/^.*tiktok/i.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let {data} = await axios.get(q.api+'tiktok?url='+m.args[0])
		console.log(data)
		let but = [['Video', `.download download2345 vid ${data.video}`], ['Music', `.download download2345 music ${data.audio}`]]
		let teks = `${data.status == 200 ? `Sukses mendapatkan link...\nDownloader By : ${data.creator}\nJudul : ${data.title}\nVideo ber WM : ${data.videoWM}` : 'Gagal mendapatkan link, mungkin error...'}`
		conn.butteks(m.chat, teks, q.name, but, m)
	} else
	if (/^.*twitter/i.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let res = await twitterdl(m.args[0])
					.catch(async _=> await twitterdlv2(m.args[0]))
		let but = res.map(v=> [`Kualitas: ${v.quality}`, `.download download2345 vid ${v.url}`])
		conn.butteks(m.chat, `Silahkan Pilih Kualitas video nya...`, q.name, but, m)
	} else
	if (regexgh.test(m.args[0])) {
		let [u,r] = m.args[0].match(regexgh)
		let resUrl = `https://api.github.com/repos/${u}/${r.replace(/.git$/, '')}/zipball`
		let but = [[`Download`, `.download download2345 doc application/zip meiBotz.zip ${resUrl}`]]
		conn.butteks(m.chat, `Silahkan klik tombol download untuk mengambil zip...`, q.name, but, m)
	} else
	if (/^.*mediafire/i.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let res = await mediafiredl(m.args[0])
					.catch(_=> q.gagal)
		let mimes = `${res.filetype}/${res.ext}`.toLowerCase();
		let names = `${res.filename}.${res.ext.toLowerCase()}`
		let but = [[`Download`, `.download download2345 doc ${mimes} ${names} ${res.url}`], [`Cadangan`, `.download download2345 doc ${mimes} ${names} ${res.url2}`]]
		conn.butteks(m.chat, `Nama File: ${res.filename}\nUpload pada: ${res.aploud}\nSize File: ${res.filesizeH}\nKlik button pertama untuk download\nJika gagal anda bisa gunakan button kedua`, q.name, but, m)
	} else
	if (/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let res = await youtubedlv2(m.args[0])
		/*let but = [['Video', `.download download2345 vid ${res.video['720p'].download()}`], ['Audio', `.download download2345 music ${res.audio['128kbps'].download()}`]]*/
		conn.sendvid(m.chat, res.video['720p'].download(), 'Nih bang', m)
	} else repl('Url yang anda masukan tidak sesuai yang tersedia disini\nDownloader terdaftar:\ntiktok\ninstagram\ntwitter\nmediafire\nyoutube\nJika url yang anda request tidak tersedia disini mintalah request ke owner')
};

export default handle;