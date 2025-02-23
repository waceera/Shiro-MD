let handler = async (m, { conn, command, text, args }) => {
if (!text) throw 'nomor/tag!'
let t1 = text.split(' ')
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : t1[0] + '@s.whatsapp.net'
   else who = m.sender
    let users = global.db.data.users
    let jumlah = t1[1] ? t1[1] : 5
    users[who].limit += jumlah * 1
    conn.reply(m.chat, `Dh`, m)
}
handler.tags = ['owner']
handler.command = ['🍆'];
handler.owner = true
export default handler