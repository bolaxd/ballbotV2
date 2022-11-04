import { instagramdl, 
		instagramdlv2,
		instagramdlv3,
		instagramdlv4,
		// zippyshare,
		tiktokdl, 
		tiktokdlv2,
		tiktokdlv3,
		twitterdl,
		twitterdlv2, 
		mediafiredl,
		youtubedl,
		youtubedlv2,
		youtubedlv3
	} from '@bochilteam/scraper';
import { format } from 'util';
export const handle = async (m, { q, d, conn, bb }) => {
	try {
		if (m.args[0] == 'download2345') {
			await conn.sendteks(m.chat, bb(q.wait), m)
			if (/vid/.test(m.args[1])) {
				try {
					conn.sendvid(m.chat, m.args[2], q.sukses, m)
				} catch (e) { conn.sendteks(m.chat, `Terjadi error saat ambil buffer :v\nSilahkan download sendiri melalui link ini\n${m.args[2]}`)}
			} else if (/doc/.test(m.args[1])) {
				try {
					conn.senddoc(m.chat, m.args[4], m.args[3], m.args[2], m)
				} catch (e) { conn.sendteks(m.chat, `Terjadi error saat ambil buffer :v\nSilahkan download sendiri melalui link ini\n${m.args[4]}`)}
			}
		} else
		if (/^.*instagram/i.test(m.args[0])) {
			await conn.sendteks(m.chat, bb('Sedang menginisialisasi link...'), m)
			let res = await instagramdl(m.args[0])
						.catch(async _=> await instagramdlv2(m.args[0]))
						.catch(async _=> await instagramdlv3(m.args[0]))
						.catch(async _=> await instagramdlv4(m.args[0]))
						.catch(_=> q.gagal)
			console.log(res);
			let url = res.map(v=>v.url.split('https://snapsave.app')[1])
			let but = [['Download', `.download download2345 vid ${url}`]]
			conn.butteks(m.chat, `Sukses mendapatkan Url...`, q.name, but, m, d.f2('Instagram', res.thumbnail, m.args[0]))
		} else
		// if (/^.*zippyshare/i.test(m.args[0])) {
		// 	await conn.sendteks(m.chat, q.wait, m)
		// 	let res = await zippyshare(m.args[0])
		// 				.catch(_=> q.gagal)
		// 	throw format(res)
		// } else
		if (/^.*tiktok/i.test(m.args[0])) {
			await conn.sendteks(m.chat, bb('Sedang menginisialisasi link...'), m)
			let res = await tiktokdl(m.args[0])
						.catch(async _=> await tiktokdlv2(m.args[0]))
						.catch(async _=> await tiktokdlv3(m.args[0]))
						.catch(_=> q.gagal)
			let but = [[`Versi Normal`, `.download download2345 vid ${res.video.no_watermark}`],[`Versi HD`, `.download download2345 vid ${res.video.no_watermark_hd}`]]
			conn.butteks(m.chat, `Pemilik video: ${res.author.nickname}`, q.name, but, m, d.f2('Tiktok', res.author.avatar, m.args[0]))
		} else
		if (/^.*twitter/i.test(m.args[0])) {
			await conn.sendteks(m.chat, bb('Sedang menginisialisasi link...'), m)
			let res = await twitterdl(m.args[0])
						.catch(async _=> await twitterdlv2(m.args[0]))
						.catch(_=> q.gagal)
			let but = res.map(v=> [`Kualitas: ${v.quality}`, `.download download2345 vid ${v.url}`])
			conn.butteks(m.chat, `Silahkan Pilih Kualitas video nya...`, q.name, but, m)
		} else
		if (/^.*mediafire/i.test(m.args[0])) {
			await conn.sendteks(m.chat, bb('Sedang menginisialisasi link...'), m)
			let res = await mediafiredl(m.args[0])
						.catch(_=> q.gagal)
			let mimes = `${res.filetype}/${res.ext}`.toLowerCase();
			let names = `${res.filename}.${res.ext.toLowerCase()}`
			let but = [[`Download`, `.download download2345 doc ${mimes} ${names} ${res.url}`], [`Cadangan`, `.download download2345 doc ${mimes} ${names} ${res.url2}`]]
			conn.butteks(m.chat, `Nama File: ${res.filename}\nUpload pada: ${res.aploud}\nSize File: ${res.filesizeH}\nKlik button pertama untuk download\nJika gagal anda bisa gunakan button kedua`, q.name, but, m)
		} else
		if (/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/.test(m.args[0])) {
			await conn.sendteks(m.chat, bb('Sedang menginisialisasi link...'), m)
			let res = await youtubedl(m.args[0])
						.catch(async _=> await youtubedlv2(m.args[0]))
						.catch(async _=> await youtubedlv3(m.args[0]))
						.catch(_=> q.gagal)
			let but = [
					['1080p', `.download download2345 vid ${await res.video['1080p'].download()}`, `Ukuran Video: ${res.video['1080p'].fileSizeH}`],
					['720p', `.download download2345 vid ${await res.video['720p'].download()}`, `Ukuran Video: ${res.video['720p'].fileSizeH}`],
					['480p', `.download download2345 vid ${await res.video['480p'].download()}`, `Ukuran Video: ${res.video['480p'].fileSizeH}`],
					['360p', `.download download2345 vid ${await res.video['360p'].download()}`, `Ukuran Video: ${res.video['480p'].fileSizeH}`],
					['240p', `.download download2345 vid ${await res.video['240p'].download()}`, `Ukuran Video: ${res.video['240p'].fileSizeH}`],
					['144p', `.download download2345 vid ${await res.video['144p'].download()}`, `Ukuran Video: ${res.video['144p'].fileSizeH}`]
				]
			conn.sendlist(m.chat, `Judul: ${res.title}\nThumbnail: ${res.thumbnail}\nLink: ${m.args[0]}\n\nSilahkan Pilih resolusi video nya dibawah!!!\nklik button dibawah!!!`, q.name, but, m)
		} else throw 'Url hang anda masukan tidak sesuai yang tersedia disini\nDownloader terdaftar:\ninstagram\ntiktok\ntwitter\nmediafire\nyoutube\nJika url yang anda request tidak tersedia disini mintalah request ke owner';
	} catch (e) { conn.sendteks(m.chat, e, d.f1('Notifikasi kegagalan!!!',''))}
}