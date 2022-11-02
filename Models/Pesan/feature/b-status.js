import { performance } from 'perf_hooks';

export const handle = async (m, { q, d, conn }) => {
	conn.sendteks(m.chat, `Kecepatan Bot respons: ${performance.now()} milisekon`, d.f1('Status Bot',''))
}