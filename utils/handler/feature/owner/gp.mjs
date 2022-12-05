import { readdirSync, readFileSync } from 'node:fs';
import cp, { exec as _exec } from 'node:child_process';
import { promisify } from 'node:util';
let path = './utils/handler/feature/';
let exc = promisify(_exec).bind(cp);

const handle = async (m, { q, conn, db }) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m);
	let i = db.cmd.findIndex(v=> v[0] == m.args[0])
	if (i === -1) return conn.sendteks(m.chat, `Mau cari plugin apa??\n\n${q.a6}\n\n${db.cmd.map(v=>v[0]).join('\n')}`, m);
	let plugin = await exc(`cat utils/handler/feature/${db.cmd[i][1]}.mjs`);
	if (plugin.stderr) return conn.sendteks(m.chat, plugin.stderr, m);
	conn.sendteks(m.chat, plugin.stdout, m)
};

export default handle;