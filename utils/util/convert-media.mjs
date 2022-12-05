import { writeFileSync, readFileSync, createReadStream } from 'fs';
import { exec } from 'child_process';
import createExif from 'node-webpmux';
import ffmpegCommand from 'fluent-ffmpeg';
import axios from 'axios';
import cheerio from 'cheerio';
import FormData from 'form-data';
import q from '../../Setting/settings.mjs';

/**
 * @param {String} name 
 * @param {String} pack
 * @returns {Object} object to describe sticker pack
 * Created by : bolaxd
*/
let jsonPostData = (name, pack) => { return {"sticker-pack-id": "bolaxd_pack_login", "sticker-pack-name": pack, "sticker-pack-publisher": name, "emojis": ["bolaxd-emoji-api"] }};
let fn = {
	jpg: `./TMP/image-${new Date()*1}.jpg`,
	vid: `./TMP/video-${new Date()*1}.mp4`,
	webp: `./TMP/stiker-${new Date()*1}.webp`,
	webp2: `./TMP/stiker-${new Date()*1}_.webp`,
	png: `./TMP/png-${new Date()*1}_.png`,
	gif: `./TMP/gif-${new Date()*1}_.gif`,
	aud: `./TMP/mp3-${new Date()*1}_.mp3`,
	aud2: `./TMP/mp3-${new Date()*1}.mp3`
};

/**
 * How to create watermark sticker using library node-webpmux
 * @param {Buffer} buffer type webp
 * @param {Object} pack author and pack sticker
 * @returns {Buffer} resolve buffer type webp
 * Created by : bolaxd
*/
function wmSticker(buffer, pack) {
	return new Promise(async (resolve, reject) => {
		await writeFileSync(fn.webp, buffer);
		let exif = new createExif.Image();
		let buff = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
		let dataExif = Buffer.from(JSON.stringify(jsonPostData(pack.name, pack.author)), "utf-8");
		let loadDataExif = Buffer.concat([buff, dataExif]);
		loadDataExif.writeUIntLE(dataExif.length,14,4);
		await exif.load(fn.webp);
		exif.exif = loadDataExif;
		await exif.save(fn.webp2);
		let readData = await readFileSync(fn.webp2);
		resolve(readData);
		q.tmp(fn.webp);
		q.tmp(fn.webp2);
	})
}

/**
 * Convert image to Sticker using Ffmpeg
 * @param {Buffer} buffer type jpg <write using fs>
 * @param {Object} pack stiker and author type object
 * @returns {Buffer} buffer type webp
 * Created by : bolaxd
*/
function imgToStiker(buffer, pack) {
	return new Promise(async(resolve, reject) => {
		await writeFileSync(fn.jpg, buffer);
		await ffmpegCommand(fn.jpg)
		.input(fn.jpg)
		.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
		.toFormat('webp')
		.save(fn.webp)
		.on("end", async () => {
			q.tmp(fn.jpg);
			let b = await readFileSync(fn.webp)
			let wm = await wmSticker(b, pack)
			resolve(wm)
		})
		.on("error", (u) => {
			q.tmp(fn.jpg);
			reject(u);
		});
	});
}

/**
 * How to convert mp4 to webp using ffmpeg 
 * @param {Buffer} buffer type mp4 or mov
 * @param {Object} pack sticker and author with object
 * @returns {Buffer} wm type webp
 * Created by : bolaxd
 */
function vidToStiker(buffer, pack) {
	return new Promise(async(resolve, reject) => {
		await writeFileSync(fn.vid, buffer);
		await ffmpegCommand(fn.vid)
		.input(fn.vid)
		.addOutputOptions(["-vcodec","libwebp","-vf","scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse","-loop","0","-ss","00:00:00","-t","00:00:10","-preset","default","-an","-vsync","0"])
		.toFormat('webp')
		.save(fn.webp)
		.on("end", async () => {
			let b = await readFileSync(fn.webp)
			let wm = await wmSticker(b, pack)
			resolve(wm)
			q.tmp(fn.vid);
		})
		.on("error", (u) => {
			q.tmp(fn.vid);
			reject(u);
		});
	});
}

/**
 * Convert Webp sticker to Image with ext .jpg
 * @param {Buffer} buffer type of webp
 * @returns {Buffer} buff return to image with ext .jpg
 * Created by : bolaxd
 */
function toJpg(buffer) {
	return new Promise(async (resolve, reject) => {
		await writeFileSync(fn.webp2, buffer)
		await exec(`ffmpeg -i ${fn.webp2} ${fn.png}`, async (err) => {
			q.tmp(fn.webp2);
			if (err) throw reject(err)
			let buff = await readFileSync(fn.png);
			q.tmp(fn.png);
			resolve(buff);
		});
	});
}

/**
 * Convert Webp to video using Ffmpeg and Imagemagick 
 * @param {Buffer} buffer type webp sticker
 * @returns {Buffer} buff type Video with ext .mp4
 * Created by : bolaxd
 * Reference : https://kotakode.com/pertanyaan/6655/Bagaimana-cara-mengubah-animated-webp-ke-mp4-%3F-di-ffmpeg
 */
function toVid(buffer) {
	return new Promise(async(resolve, reject) => {
		await writeFileSync(fn.webp, buffer);
		await exec(`convert ${fn.webp} ${fn.gif}`, async (err) => {
			if (err) {
				q.tmp(fn.webp);
				return reject(err);
			}
			await exec(`ffmpeg -i ${fn.gif} -pix_fmt yuv420p -c:v libx264 -movflags +faststart -filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2' ${fn.vid}`, async (err) => {
				if (err) {
					q.tmp(fn.webp);
					q.tmp(fn.gif)
					return reject(err);
				}
				let buff = await readFileSync(fn.vid);
				resolve(buff);
				q.tmp(fn.webp);
				q.tmp(fn.gif);
				q.tmp(fn.vid);
			});
		});
	});
}

/**
 * Convert Webp to video using post method to https://s6.ezgif.com/webp-to-mp4
 * Source : https://s6.ezgif.com/webp-to-mp4
 * @param {Buffer} buffer type webp sticker
 * @returns {Buffer} result type Video with ext .mp4
 * Created by : bolaxd
 * Coded by : mrhtz
 */
function toVid2(buffer) {
	return new Promise(async (resolve, reject) => {
		await writeFileSync(fn.webp, buffer)
		const form = new FormData();
		form.append("new-image-url", "");
		form.append("new-image", createReadStream(fn.webp));
		axios({
				method: 'post',
				url: 'https://s6.ezgif.com/webp-to-mp4',
				data: form,
				headers: {
					'Content-Type': `multipart/form-data; boundary=${form._boundary}`
				}
			}).then(({ data }) => {
				const form2 = new FormData();
				const $ = cheerio.load(data);
				const file = $('input[name="file"]').attr('value')
				form2.append('file', file)
				form2.append('convert', "Convert WebP to MP4!")
				axios({
					method: 'post',
					url: 'https://ezgif.com/webp-to-mp4/' + file,
					data: form2,
					headers: {
						'Content-Type': `multipart/form-data; boundary=${form2._boundary}`
					}
				}).then(({ data }) => {
					const $ = cheerio.load(data)
					const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
					resolve(result)
					q.tmp(fn.webp)
				}).catch(e=> reject(e))
			}).catch(e=> reject(e))
	})
};

/**
 * Convert Video to Audio using ffmpeg
 * @param {Buffer} buffer type Video ext .mp4
 * @returns {Buffer} buff type Audio ext .mp3
 * Created by : bolaxd
 */
function toMp3(buffer) {
	return new Promise(async(resolve, reject) => {
		await writeFileSync(fn.vid, buffer);
		await ffmpegCommand(fn.vid)
		.output(fn.aud)
		.on("end", async () => {
			let buff = await readFileSync(fn.aud);
			resolve(buff);
			q.tmp(fn.vid);
			q.tmp(fn.aud);
		})
		.on("error", (err) => reject(err)).run();
	});
}

/**
 * Image to Url Posted
 * @param {Buffer} buffer type Image ext .png | .jpg
 * @returns {String} baseUrl+data[0].src type url<String>
 * Created by : bolaxd
 */
function toUrl(buffer) {
	return new Promise (async (resolve, reject) => {
		await writeFileSync(fn.jpg, buffer)
		let baseUrl = 'https://telegra.ph'
		try {
			const form = new FormData();
			form.append("file", createReadStream(fn.jpg))
			const {data} = await axios({
				url: baseUrl + "/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			q.tmp(fn.jpg)
			return resolve(baseUrl + data[0].src)
		} catch (err) {
			return reject(err)
		}
	})
};

/**
 * @param {Buffer} buffer buffer type audio ext .opus | .mp3
 * @param {String} type type to describe what are you convert
 * @returns {Buffer} buffer audio form convert ffmpeg 
 * Created by : bolaxd
 */
function effectAudio(buffer, type) {
	return new Promise(async (resolve, reject) => {
		let effect = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'slow', 'smooth', 'tupai']
		if (!effect.includes(type)) return reject('Maaf!!!, type nya tidak tersedia disini')
		let hasil;
		switch (type) {
			case effect[0]: { hasil = '-af equalizer=f=54:width_type=o:width=2:g=20' } break;
			case effect[1]: { hasil = '-af acrusher=.1:1:64:0:log' } break;
			case effect[2]: { hasil = '-af atempo=4/4,asetrate=44500*2/3' } break;
			case effect[3]: { hasil = '-af volume=12' } break;
			case effect[4]: { hasil = '-filter:a "atempo=1.63,asetrate=44100"' } break;
			case effect[5]: { hasil = '-filter:a "atempo=1.6,asetrate=22100"' } break;
			case effect[6]: { hasil = '-filter:a atempo=1.06,asetrate=44100*1.25' } break;
			case effect[7]: { hasil = '-filter_complex "areverse"' } break;
			case effect[8]: { hasil = '-filter:a "atempo=0.7,asetrate=44100"' } break;
			case effect[9]: { hasil = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"' } break;
			case effect[10]: { hasil = '-filter:a "atempo=0.5,asetrate=65100"' } break;
		}
		await writeFileSync(fn.aud, buffer);
		exec(`ffmpeg -i ${fn.aud} ${hasil} ${fn.aud2}`, async (err) => {
			q.tmp(fn.aud);
			if (err) return reject(err);
			let buff = readFileSync(fn.aud2);
			await resolve(buff);
			q.tmp(fn.aud2)
		});
	});
}

export { fn, toJpg, toVid, toVid2, wmSticker, imgToStiker, vidToStiker, toUrl, effectAudio }; 
