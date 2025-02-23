/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[1] ? args[1] : false
    else who = m.chat
    let user = db.data.users[who]
    if (!who) throw `Siapa Yg Mau Di Jadiin Premium Sayang?!`
    
    if (!args[1]) throw `Mau Berapa Hari??`
        
    if (args[1] == 'permanen') {
    user.premium = true
    user.premiumTime = 0
   m.reply(`Success
*Nama:* ${user.name}
*Selama:* ${args[1]}`)
    } else {
if (isNaN(args[1])) return m.reply(`Hanya Nomor!\n\nExample:\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`)
let txt = args[1].replace('@' + who.split`@`[0], '').trim()
var jumlahHari = 86400000 * txt
    var now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += jumlahHari
    else user.premiumTime = now + jumlahHari
user.premium = true
    m.reply(`Success
*Nama:* ${user.name}
*Selama:* ${txt} Hari`)
}
}
handler.help = ['']
handler.tags = ['']
handler.command = ['prm']

handler.group = true 
handler.owner = true

export default handler