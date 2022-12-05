import { Brainly } from 'brainly-scraper-v2';
const brain = new Brainly('id');

const handle = async (m, { q, conn, more, repl }) => {
	if (!m.query) return repl(q.notext);
	let res = await brain.searchWithMT(m.query, 'id');
	let teks = q.tit('BRAINLY SEARCHING')+'\n'
		 teks += res.map(({ question, answers }, i) => `\n*Tingkat :* ${question.grade ? ` ${question.grade}`.split(' ').map(v=>v.charAt(0)).join('') : ''}\n${question.content}${answers.map((v, i) => `\n\n*Jawaban ${i + 1} :* ${v.verification ? ' Terverivikasi 👍' : ''}${v.isBest ? ' Top 😍' : ''}\n${v.content}${v.attachments.length > 0 ? `\nLink: ${v.attachments.join(', ')}` : ''}`).join``}`).join('\n' + q.a6 + '\n' + more)
	repl(teks)
};

export default handle;