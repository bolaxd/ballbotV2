// const { igApi, fetchUserV2 } = (await import('insta-fetcher')).default;
// import { instagramStalk } from '@bochilteam/scraper';
import axios from 'axios';

let baseUrl = 'https://saipulanuar.ga/api/'
let api = 'G9ak9YmL'
const handle = async (m, { q, conn, bot, repl }) => {
	if (!m.args[0]) return repl('Masukan nama instagram nya!');
	// const ig = new igApi(conn.db.data.set[bot].cookie)
	// const res = await ig.fetchUser(m.query).catch(async _=> await ig.fetchUserV2(m.query).catch(_=> console.log(_)));
	// // console.log(res);
	// let teks = `STALKED IG\n\n`
	// 			+ `*nama :* ${res?.fullname}${res?.is_private ? ' 🔒 ' : ' 🔓 '}${res?.is_verified ? ' ✅ ' : ''}${res?.is_business ? ` | Akun bisnis ` : ''}\n`
	// 			+ `*nama user :* @${res?.username}\n`
	// 			+ `*Pengikut :* ${res?.followers.rupiah()}\n`
	// 			+ `*Mengikuti :* ${res?.following.rupiah()}\n`
	// 			+ `*Postingan :* ${res?.post_count.rupiah()}\n`
	// 			+ `${res?.biography ? `*Biodata :* ` +res?.biography+ '\n' : ''}`
	// 			+ `${res?.external_url ? `*Website :* ` +res?.external_url+ '\n' : ''}`
	// 			+ `${res?.contact_phone_number ? `*Contact :* ` +res?.contact_phone_number+ '\n' : ''}`
	// 			+ `${res?.public_email ? `*Email :* ` +res?.public_email+ '\n' : ''}`
	// conn.sendimg(m.chat, res.hd_profile_pic_url_info?.url, teks, m)
	
	// let res = await instagramStalk(m.args[0]);
	// let teks = `STALKING INSTAGRAM\n\n`
	// 			+ `Nama: ${res.name}\n`
	// 			+ `Username: ${res.username}\n`
	// 			+ `Bio: ${res.description}\n`
	// 			+ `Pengikut: ${res.followersH}\n`
	// 			+ `Mengikuti: ${res.followingH}\n`
	// 			+ `Postingan: ${res.postsH}\n`
	// conn.sendimg(m.chat, res.avatar, teks, m)
	
	let { data } = await axios.get(`${baseUrl}stalk/ig?username=${m.args[0]}&apikey=${api}`)
	if (data.status !== 200) return repl('API sedang mengalami gangguan...')
	let teks = `STALKING INSTAGRAM\n\n`
				+ `Username : ${data.result?.username}\n`
				+ `Name : ${data.result?.fullName}\n`
				+ `Bio : ${data.result?.bio}\n`
				+ `Followers : ${data.result?.followersM}\n`
				+ `Following : ${data.result?.followingM}\n`
				+ `Post : ${data.result?.postsCountM}\n`
	conn.sendimg(m.chat, data.result?.profilePicHD, teks, m)
}

export default handle;