let handler = async (m, { text, usedPrefix, command }) => {
    global.db.data.sticker = global.db.data.sticker || {}
    if (!m.quoted) throw "Balas sticker yang akan diubah menjadi command\nContoh: !Setcmd !ai hallo"
    if (!m.quoted.fileSha256) throw 'Balas sticker yang akan diubah ke cmd'
    if (!text) throw `Balas sticker yang akan diubah menjadi command\nContoh: !Setcmd !ai hallo`
    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256.toString('base64')
    if (sticker[hash] && sticker[hash].locked) throw 'Cmd ini dikunci oleh *Owner*'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`Succes Menambahkan CMD!\nKirim sticker yang kamu tambahkan CMD dan lihat hasilnya`)
}


handler.help = ['setcmd']
handler.tags = ['btmenu']
handler.command = ['set','setcmd']
handler.premium = true
export default handler