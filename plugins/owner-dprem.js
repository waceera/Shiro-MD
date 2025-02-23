let handler = async (m, { conn, text }) => {
    if (!text) throw 'Siapa Yang Mau Di Berhentikan Sebagai User Premium?'
    let who
    // Cek apakah format nomor yang diberikan sesuai dengan pola (misalnya, dimulai dengan 62xx)
    if (/^\d{10,15}$/.test(text)) {
        // Jika nomor valid, tambahkan domain WhatsApp
        who = `${text}@s.whatsapp.net`
    } else if (m.isGroup) {
        // Jika di dalam grup, gunakan mention
        who = m.mentionedJid[0]
    } else {
        throw 'Format nomor tidak valid atau tag pengguna!'
    }

    if (!who) throw 'Tag??'
    let users = global.db.data.users
    users[who].premium = false
    users[who].premiumTime = 0
    conn.reply(m.chat, 'Done!', m)
}

handler.help = ['delprem']
handler.tags = ['owner']
handler.command = ['dprem']
handler.owner = true
export default handler