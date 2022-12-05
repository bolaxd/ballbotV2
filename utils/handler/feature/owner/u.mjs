import cp from 'child_process'
import { promisify, format } from 'util'
let exec = promisify(cp.exec).bind(cp)

const handle = async (m, { q, bb, conn, repl }) => {
    let cap = `"update hehe ${new Date()*1}"`
	if (!m.isOwn) return
    await repl(bb('Wait for updating github...'))
	exec(`git config --global user.email ${q.emailgh} && git config --global user.name ${q.usernamegh} && git add . && git commit -m ${cap} && git push`, (stderr, stdout) => {
		if (stderr) return repl(stderr);
		if (stdout) return repl(stdout);
	})
}

export default handle;