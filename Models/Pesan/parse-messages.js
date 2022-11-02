const { proto, downloadContentFromMessage, getContentType } = (await import('baileys')).default;
import q from '../../Setting/settings.js';

const dlMessage=async(message)=>{try{let mime=(message.msg||message).mimetype||'';let messageType = message.mtype ? message.mtype.replace(/Message/gi, ''): mime.split('/')[0];const stream=await downloadContentFromMessage(message,messageType);let buffer = Buffer.from([]);for await(const chunk of stream) buffer = Buffer.concat([buffer, chunk]);return buffer}catch(e){console.log(e)}};
// jangan di utek utek coii, biarin aja ini
export default (serve, m, s) => {
	try {
		if (!m) return m
		let M = proto.WebMessageInfo
		if (m.key) {
			m.id = m.key.id
			m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
			m.chat = m.key.remoteJid
			m.fromMe = m.key.fromMe
			m.isGc = m.chat.endsWith(q.idgc)
			m.isPc = m.chat.endsWith(q.idwa)
			if (m.isGc) m.participant = serve.createJid(m.key.participant) || ''
			m.sender = serve.createJid(m.fromMe && serve.user.id || m.participant || m.key.participant || m.chat || '')
			m.isOwn = q.developer.map(v=> v+q.idwa).includes(m.sender)
			m.isMod = q.moderator.map(v=> v+q.idwa).includes(m.sender)
		}
		if (m.message) {
			if (m?.message?.messageContextInfo) delete m.message.messageContextInfo
			if (m?.message?.senderKeyDistributionMessage) delete m.message.senderKeyDistributionMessage
			m.mtype = getContentType(m.message) /*Dapatkan dan meng Inisialisasi content ambil dari baileys*/
			m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
			if (m.message['call']) return
			let quntul = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
			// console.log(quntul)
			m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
			m.react = m.mtype == 'reactionMessage' ? m.message[m.mtype] : null
			if (m.react) {
				m.rkey = m.message[m.mtype].key
				m.rchat = m.message[m.mtype].key.remoteJid
				m.rfromMe = m.message[m.mtype].key.fromMe
				m.rId = m.message[m.mtype].key.id
				m.rtext = m.message[m.mtype].text
				m.rtime = m.message[m.mtype].senderTimestampMs
				m.rtarget = m.isGc ? m.message[m.mtype].key.participant : ''
			}
			if (m.msg.url) m.download = () => dlMessage(m.msg)
			if (m.quoted) {
				let type = Object.keys(m.quoted)[0]
				m.quoted = m.quoted[type]
				if (['productMessage'].includes(type)) { type = Object.keys(m.quoted)[0], m.quoted = m.quoted[type] }
				if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
				m.quoted.mtype = type
				m.quoted.id = m.msg.contextInfo.stanzaId
				m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
				m.quoted.isBot = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
				m.quoted.sender = serve.createJid(m.msg.contextInfo.participant)
				m.quoted.fromMe = m.quoted.sender === (serve.user && serve.user.id)
				m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
				m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
				m.quoted.download = () => dlMessage(m.quoted)
				m.getQuotedObj = m.getQuotedMessage = async () => {
					if (!m.quoted.id) return false
					let q = await s.loadMessage(m.chat, m.quoted.id, serve)
					return parser(serve, q, s)
				};
				let vM = m.quoted.fakeObj = M.fromObject({
					key: {
						remoteJid: m.quoted.chat,
						fromMe: m.quoted.fromMe,
						id: m.quoted.id
					},
					message: quntul,
					...(m.isGc ? { participant: m.quoted.sender } : { participant: undefined })
				});
			}
			m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
	   	let cmdd = (m.mtype === 'conversation') ? m.message.conversation: (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption: (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
			m.preff = /^[/\.!#]/.test(cmdd) ? cmdd.match(/^[/\.!#]/) : '/'
			m.cmd = (m.mtype === 'conversation' && m.message.conversation.startsWith(m.preff)) ? m.message.conversation : (m.mtype == 'imageMessage' && m.message.imageMessage.caption.startsWith(m.preff)) ? m.message.imageMessage.caption : (m.mtype == 'videoMessage' && m.message.videoMessage.caption.startsWith(m.preff)) ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage' && m.message.extendedTextMessage.text.startsWith(m.preff)) ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId: (m.mtype == 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId) ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text): ''
			m.args = m.cmd.trim().split(/ +/).slice(1)
			m.query = m.args.join(" ")
			m.command = m.cmd.slice(1).trim().split(/ +/).shift().toLowerCase()
		}
	   return m;
	} catch (e) {
		console.log(e);
	}
}