let handler = async (m, { participants, isOwner }) => {
    global.db.data.chats[m.chat].isBanned = true;
    m.reply('Done!\n\n> Bot hanya akan merespon ke *Owner*');
    if (global.db.data.chats[m.chat]?.isBanned && !isOwner) {
        return false;
    }
}
handler.help = ['bnc'];
handler.tags = ['owner'];
handler.command = /^(banchat|bnc)$/i;
handler.owner = true;

export default handler;