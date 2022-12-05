import { latinToAksara } from '@bochilteam/scraper';

const handle = async (m, { q, conn, repl }) => {
	if (!m.query) return repl(q.notext);
	repl(`Terjemah dari : ${m.query}\n\n${await latinToAksara(m.query)}`)
}

export default handle;