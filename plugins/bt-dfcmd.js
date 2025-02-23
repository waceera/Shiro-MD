let handler = async (m, { text }) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `Balas sticker yang akan dihapus commandnya`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) throw 'Anda tidak dapat menghapus cmd ini'
    delete sticker[hash]
    m.reply(`Perintah succes dihapus`)
}


handler.help = ['delcmd']
handler.tags = ['btmenu']
handler.command = ['delcmd']
handler.premium = true
export default handler