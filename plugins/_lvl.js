import { canLevelUp } from '../lib/levelling.js'

export async function before(m) {
  let user = global.db.data.users[m.sender]
  if (!user.autolevelup) return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
      if (user.level <= 10) {
        user.role = 'Gak Kenal'
    } else if (user.level <= 30) {
        user.role = 'Baru Kenal'
    } else if (user.level <= 50) {
        user.role = 'Temen Biasa'
    } else if (user.level <= 100) {
        user.role = 'Temen Ngobrol'
    } else if (user.level <= 150) {
        user.role = 'Temen Gosip'
    } else if (user.level <= 300) {
        user.role = 'Temen Lama'
    } else if (user.level <= 350) {
        user.role = 'Temen Hangout'
    } else if (user.level <= 500) {
        user.role = 'Temen Deket'
    } else if (user.level <= 650) {
        user.role = 'Temen Akrab'
    } else if (user.level <= 800) {
        user.role = 'Temen Baik'
    } else if (user.level <= 1350) {
        user.role = 'Sahabat'
    } else if (user.level <= 3200) {
        user.role = 'Sahabat Deket'
    } else if (user.level <= 4550) {
        user.role = 'Sahabat Sejati'
    } else if (user.level <= 10000) {
        user.role = 'Pacar'
    } else {
        user.role = 'Soulmate'
    }
  
    if (before !== user.level) {
      let ini_txt = `🔥 Wahh! @${m.sender.replace(/@.+/g, '')}, level kamu naik nih!

🌟 *Level Up* : *${before}* -> *${user.level}*
🏅 *Role Baru* : *${user.role}*`.trim()
        try {
          let image, data, pp
            try {
              pp = await this.profilePictureUrl(m.sender, 'image')
            } catch {
              pp = 'https://i.ibb.co/m53WF9N/avatar-contact.png'
            }
            console.log(ini_txt)
        } catch {
          console.log("err")
        }
    }
}

export const disabled = false
