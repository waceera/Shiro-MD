/*
- Shyro Soft
*/
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let q = m.quoted || m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (!mime && !args[0]) {
    return m.reply("Kirim gambar/video yang ingin dijadikan Sticker\n\n> Batas max sticker bergerak 10 detik!")
  }
  let stiker = false
  try {
    let [packname, ...author] = args.join` `.split`|`
    author = (author || []).join`|`
    if (/webp/g.test(mime)) {
      let img = await q.download?.()
      stiker = await addExif(img, "@veikone_bot" || '', m.name || '')
    } else if (/image/g.test(mime)) {
      let img = await q.download?.()
      stiker = await createSticker(img, false, "@veikone_bot", m.name)
    } else if (/video/g.test(mime)) {
      if ((q.msg || q).seconds > 10) throw 'Batas max sticker bergerak 10 detik!'
      let img = await q.download?.()
      stiker = await mp4ToWebp(img, { packname: "@veikone_bot", author: m.name })
    } else if (args[0] && isUrl(args[0])) {
      stiker = await createSticker(false, args[0], "veikone_bot", m.name, 20)
    } else {
      throw "Kirim gambar/video yang ingin dijadikan Sticker"
    }
  } catch (e) {
    m.reply("Error: Batas max sticker bergerak 10 detik!\n\n> Jika error ini salah silahkan lapor ke *!Owner*" || 'Terjadi kesalahan!')
  } finally {
    if (stiker) {
      await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
    }
  }
}

handler.help = ['sticker']
handler.tags = ['convert']
handler.command = /^(sfull|sgif|s|sticker|stiker)$/i
handler.limit = true
export default handler

const isUrl = (text) =>
  text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  )
async function createSticker(img, url, packName, authorName, quality) {
  let stickerMetadata = {
    type: 'full',
    pack: packName,
    author: authorName,
    quality,
  }
  return new Sticker(img ? img : url, stickerMetadata).toBuffer()
}

async function mp4ToWebp(file, stickerMetadata) {
  if (!stickerMetadata) stickerMetadata = { pack: '‎', author: '‎', crop: false }
  let getBase64 = file.toString('base64')
  let Format = {
    file: `data:video/mp4;base64,${getBase64}`,
    processOptions: {
      crop: stickerMetadata.crop,
      startTime: '00:00:00.0',
      endTime: '00:00:7.0',
      loop: 0,
    },
    stickerMetadata: { ...stickerMetadata },
  }
  let res = await fetch(
    'https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl',
    {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(Format),
    }
  )
  return Buffer.from((await res.text()).split(';base64,')[1], 'base64')
}