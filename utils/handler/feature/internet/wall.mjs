import { wallpaper, wallpaperv2, wallpaperv3 } from '@bochilteam/scraper';

const handle = async (m, { q, conn, repl }) => {
		if (!m.query) return repl(q.query);
		await repl(q.wait);
		if (m.args[0] == 'oyoo') {
			conn.sendimg(m.chat, m.args[1], q.sukses, m)
		} else {
			let res = await wallpaper(m.query).catch(_=> wallpaperv2(m.query)).catch(_=>wallpaperv3(m.query)).catch(_=>_);
			let list = [];
			for (const u of res) list.push(['Link => '+u, `.wallpaper oyoo ${u}`, '']);
			list.push([`Wallpaper search by: ${q.name}`, '', '']);
			conn.sendlist(m.chat, `WALLPAPER SEARCH\n\nTotal ${res.length} Wallpaper dari query/kata kunci : ${m.query}`, `Wall search by: ${q.name}`, list, m);
		}
};

export default handle;