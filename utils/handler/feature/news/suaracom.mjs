import { suaracom } from '@bochilteam/scraper';

const handle = async (m, { q, conn }) => {
	let res = await suaracom()
	conn.sendimg(m.chat, res[0].image || res[1].image, res.map(v=> `${v.title}\n${v.description}\nLink: ${v.link}\n\n${v.date}`).join('\n'+q.a6+'\n'), m)
}

export default handle;