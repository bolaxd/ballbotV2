import fs from 'fs';

const path = `./Media/Sticker/bot.webp`

const handle = async (m, { q, conn, budy }) => {
	if (m.command=='bot') {
		if (m.fromMe) return
		conn.sendstik(m.chat, await fs.readFileSync(path), m)
	}
}

export default handle;