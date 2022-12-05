import fetch from 'node-fetch';
import axios from 'axios';
import fs from 'fs';

export default function proto() {
	Number.prototype.rupiah = function rupiah() {
		var tostr = this.toString();
		var mlds = tostr.length % 3;
		var iris = tostr.substr(0, mlds);
		var ribu = tostr.substr(mlds).match(/\d{3}/g);
		let res;
		if (ribu) {
			res = mlds ? ',' : '';
			iris += res + ribu.join(',');
		}
		return iris;
	};
	
	Array.prototype.rendem = function rendem() {
		return this[Math.floor(Math.random() * this.length)];
	}
	
	Number.prototype.timers = function timers() {
		const seconds = Math.floor((this / 1000) % 60),
		minutes = Math.floor((this / (60 * 1000)) % 60), 
		hours = Math.floor((this / (60 * 60 * 1000)) % 24), 
		days = Math.floor((this / (24 * 60 * 60 * 1000)));
		return `${days ? `${days} Hari ` : ''} ${hours ? `${hours} Jam ` : ''} ${minutes ? `${minutes} Menit ` : ''} ${seconds ? `${seconds} Detik` : ''}`;
	};
	
	String.prototype.getbuffer = async function getbuffer() {
		const { data } = await axios({
			method: "GET",
			url: this,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			responseType: 'arraybuffer'
		});
		return data;
	};
	
	String.prototype.fetchjson = async function fetchjson(options) {
		options ? options : {};
		const { data } = await axios({
			method: "GET",
			url: this,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
			},
			...options,
		});
		return data;
	};
	
	Number.prototype.sizeString = function sizeString(des = 2) {
		if (this === 0) return '0 Bytes';
		const dm = des < 0 ? 0 : des;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(this) / Math.log(1024));
		return parseFloat((this / Math.pow(1024, i)).toFixed(dm)) + ' ' + sizes[i];
	};
};