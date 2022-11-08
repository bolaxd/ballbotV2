import { exec } from 'child_process';
import createExif from 'node-webpmux';
import ffmpegCommand from 'fluent-ffmpeg';
import q from '../../Setting/settings.js';
import { writeFileSync, readFileSync } from 'fs';


// USING PACKAGE IMAGEMAGICK AND FFMPEG
let jsonPostData = (name, pack) => { return {"sticker-pack-id": "bolaxd_pack_login", "sticker-pack-name": pack, "sticker-pack-publisher": name, "emojis": ["bolaxd-emoji-api"] }};
let fn = {
	jpg: `./TMP/image-${new Date*1}.jpg`,
	vid: `./TMP/video-${new Date*1}.mp4`,
	webp: `./TMP/stiker-${new Date*1}.webp`,
	webp2: `./TMP/stiker-${new Date*1}_.webp`,
	png: `./TMP/png-${new Date*1}_.png`,
	gif: `./TMP/gif-${new Date*1}_.gif`,
	aud: `./TMP/mp3-${new Date*1}_.mp3`
};

function imgToStiker(buffer, pack) {
	return new Promise(async(resolve, reject) => {
		await writeFileSync(fn.jpg, buffer);
		await ffmpegCommand(fn.jpg)
		.input(fn.jpg)
		.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
		.toFormat('webp')
		.save(fn.webp)
		.on("end", async () => {
			let exif = new createExif.Image();
			let buffer = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
			let dataExif = Buffer.from(JSON.stringify(jsonPostData(pack.name, pack.author)), "utf-8");
			let loadDataExif = Buffer.concat([buffer, dataExif]);
			loadDataExif.writeUIntLE(dataExif.length,14,4);
			await exif.load(fn.webp);
			q.tmp(fn.webp);
			q.tmp(fn.jpg);
			exif.exif = loadDataExif;
			await exif.save(fn.webp2);
			let readData = await readFileSync(fn.webp2);
			resolve(readData);
			q.tmp(fn.webp2);
		})
		.on("error", (u) => {
			q.tmp(fn.jpg);
			reject(u);
		});
	});
}

function vidToStiker(buffer, pack) {
	return new Promise(async(resolve, reject) => {
		await writeFileSync(fn.vid, buffer);
		await ffmpegCommand(fn.vid)
		.input(fn.vid)
		.addOutputOptions(["-vcodec","libwebp","-vf","scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse","-loop","0","-ss","00:00:00","-t","00:00:10","-preset","default","-an","-vsync","0"])
		.toFormat('webp')
		.save(fn.webp)
		.on("end", async () => {
			let exif = new createExif.Image();
			let buffer = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
			let dataExif = Buffer.from(JSON.stringify(jsonPostData(pack.name, pack.author)), "utf-8");
			let loadDataExif = Buffer.concat([buffer, dataExif]);
			loadDataExif.writeUIntLE(dataExif.length,14,4);
			await exif.load(fn.webp);
			q.tmp(fn.webp);
			q.tmp(fn.vid);
			exif.exif = loadDataExif;
			await exif.save(fn.webp2);
			let readData = await readFileSync(fn.webp2);
			resolve(readData);
			q.tmp(fn.webp2);
		})
		.on("error", (u) => {
			q.tmp(fn.vid);
			reject(u);
		});
	});
}
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
// https://kotakode.com/pertanyaan/6655/Bagaimana-cara-mengubah-animated-webp-ke-mp4-%3F-di-ffmpeg
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
export { fn, toJpg, toVid, imgToStiker, vidToStiker }; 
