import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';


const post = (url, formdata) => {
	return fetch(url, {
		method: "POST",
		header: {
			accept: "*/*",
			"accept-language": "en-US,en;q=0.9",
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		body: new URLSearchParams(Object.entries(formdata))
	})
};

const regex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/
const yt = async (url, quality, type, bitrate, server = "en68") => {
	let Id = regex.exec(url);
	url = 'https://youtu.be/' + Id[1]
	let res = (await post(`https://www.y2mate.com/mates/${server}/analyze/ajax`, {
		url,
		q_auto: 0,
		ajax: 1
	})).json();
	let { document } = (new JSDOM(res.result)).window
	let tables = document.querySelectorAll('table')
	let table = tables[{ mp4: 0, mp3: 1 }[type] || 0]
	let options;
	switch (type) {
		case 'mp3':
			options = Object.fromEntries([...table.querySelectorAll('td > a[href="#"]')].filter(v => !/\.3gp/.test(v.innerHTML)).map(v => [v.innerHTML.match(/.*?(?=\()/)[0].trim(), v.parentElement.nextSibling.nextSibling.innerHTML]))
		    break;
		case 'mp4':
			options = {
				'128kbps': table.querySelector('td > a[href="#"]').parentElement.nextSibling.nextSibling.innerHTML
			}
			break;
		default:
      	options = {}
	}
	let filesize = options[quality]
	let id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
	let thumb = document.querySelector('img').src
	let title = document.querySelector('b').innerHTML
	let res2 = (await post(`https://www.y2mate.com/mates/${server}/convert`, {
		type: 'youtube',
		_id: id[1],
		v_id: ytId[1],
		ajax: '1',
		token: '',
		ftype: type,
		fquality: bitrate
	})).json()
	let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
	let resUrl = /<a.+?href="(.+?)"/.exec(res2.result)[1]
	return { res: resUrl.replace(/https/g, 'http'), thumb, title, size_awal: filesize, size: KB }
}