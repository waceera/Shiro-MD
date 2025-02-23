let handler = async (m, { conn, text }) => {
    if (!text) throw 'Masukkan user yang ingin di ban\n\nContoh: .ban 62xxx atau tag user tersebut'
    let who
    if (m.isGroup) {
        who = m.mentionedJid[0]
    }
    if (!who) {
        let isNumber = text.replace(/\D/g, '')
        if (/^\d+$/.test(isNumber)) {
            who = isNumber + '@s.whatsapp.net'
        }
    }
    if (!who) throw 'Masukkan user yang valid untuk di ban\n\nContoh: .ban 62xxx atau tag user tersebut'
    let users = global.db.data.users
    if (!users[who]) throw 'User tidak ditemukan di database'
    users[who].banned = true
    conn.reply(m.chat, "Banned berhasil!")
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = ['ban','banned']
handler.owner = true

export default handler