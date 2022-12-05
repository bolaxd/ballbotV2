import axios from 'axios';
import cheerio from 'cheerio';

const handle = async (m, { q, conn, repl }) => {
	if (!m.query) return repl(`Masukan Nama nya !!!`)
	let res = await getStalk(m.query)
	conn.sendimg(m.chat, res.profile, `Nama: ${res.name}\nUsername: ${res.username}\nFollowers: ${res.followers}\nFollowing: ${res.following}\nDescription: ${res.desc}`, m)
}

export default handle;

async function getStalk(query) {
  let req = await axios.get(`https://urlebird.com/user/${query}/`)
  let $ = cheerio.load(req.data), res = {}
  res.profile = $('div[class="col-md-auto justify-content-center text-center"] > img').attr('src')
  res.name = $('h1.user').text().trim()
  res.username = $('div.content > h5').text().trim()
  res.followers = $('div[class="col-7 col-md-auto text-truncate"]').text().trim().split(' ')[1]
  res.following = $('div[class="col-auto d-none d-sm-block text-truncate"]').text().trim().split(' ')[1]
  res.desc = $('div.content > p').text().trim()
  return res
}