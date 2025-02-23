let handler = async (m) => {
    global.db.data.chats[m.chat].isBanned = false
    m.reply('Done!')
}
handler.help = ['ubc']
handler.tags = ['owner']
handler.command = /^(unbanchat|ubc)$/i
handler.owner = true

export default handler