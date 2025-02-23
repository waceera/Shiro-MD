/*
- Shyro Soft
*/
import * as cheerio from 'cheerio'
import moment from 'moment-timezone'
import axios from 'axios'

let handler = m => m
handler.all = async function(m) {
    let name = await conn.getName(m.sender)
    let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
    let fotonyu = 'https://telegra.ph/file/e1047817d256d9e372144.jpg'
    try {
        pp = await this.profilePictureUrl(m.sender, 'image')
    } catch (e) {} finally {
        global.doc = pickRandom(["application/vnd.ms-excel", "https://qu.ax/DgPoo.jpg", "https://qu.ax/WQXeX.jpg", "https://qu.ax/WQXeX.jpg", "https://qu.ax/xwmfC.jpg", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])
        global.thumbs = pickRandom(["https://qu.ax/GDMZB.jpg", "https://qu.ax/bURYc.jpg", "https://qu.ax/ZxRrg.jpg", "https://qu.ax/RKjUv.jpg", "https://qu.ax/kTwmm.jpg", "https://qu.ax/QCZOm.jpg", "https://qu.ax/wNdCS.jpg", "https://qu.ax/EBPKA.jpg", "https://qu.ax/XTgek.jpg", "https://qu.ax/pmtVY.jpg"])
        global.thumb = pickRandom(["https://qu.ax/dmUap.jpg", "https://qu.ax/LCBJl.jpg", "https://qu.ax/cMNBZ.jpg", "https://qu.ax/nnbFU.jpg", "https://qu.ax/SXqGt.jpg", "https://qu.ax/HtmsY.jpg", "https://qu.ax/xAahF.jpg"])
        global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000])
        global.axios = axios
        global.fetch = (await import('node-fetch')).default
        global.cheerio = cheerio
        global.fs = (await import('fs')).default
        global.ephemeral = '86400'
        global.ucapan = ucapan()
        global.botdate = date()
        global.bottime = `${moment.tz("Asia/Jakarta").format("HH:mm:ss")}`     
        global.adReply = {
            contextInfo: {
                forwardingScore: 0,
                isForwarded: false
            }
        }
    }
}

export default handler
function date() {
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, {
        weekday: 'long'
    })
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let tgl = `${week}, ${date}`
    return tgl
}
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat malam 🌙 "
    if (time >= 4) {
        res = "Selamat pagi 🌄 "
    }
    if (time > 10) {
        res = "Selamat siang ☀️ "
    }
    if (time >= 15) {
        res = "Selamat sore 🌅 "
    }
    if (time >= 18) {
        res = "Selamat malam 🌙 "
    }
    return res
}
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}