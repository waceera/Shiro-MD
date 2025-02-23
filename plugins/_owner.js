/*
- Shyro Soft
*/

let handler = async (m, { conn }) => {
const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(global.info.nomerown + '@s.whatsapp.net')}\nFN:${await conn.getName(global.info.nomerown + '@s.whatsapp.net')}\nitem1.TEL;waid=${global.info.nomerown}:${global.info.nomerown}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:shyro.syr@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://nekopoi.care\nitem3.X-ABLabel:Kucing Kesayangan\nitem4.ADR:;;Isekai;;;;\nitem4.X-ABLabel:Region\nitem5.X-ABLabel:,🍆\nEND:VCARD`
	await conn.sendMessage(m.chat, { contacts: { displayName: 'Shyro Soft', contacts: [{ vcard }] }}, { quoted: m })
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = /^(owner|creator)/i
export default handler