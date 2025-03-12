/* 
Ini wm
*/
import { sticker } from '../lib/sticker.js';

let handler = async(m, {conn, usedPrefix, command, text}) => {
const query = text ? text : m.quoted?.text ? m.quoted.text : m.quoted?.caption ? m.quoted.caption : m.quoted?.description ? m.quoted.description : text;
  if (!query) throw `Masukkan teks, contoh:\n\n${usedPrefix+command} i love shyro`
   let brats = await sticker(null, `https://rayhanzuck.vercel.app/api/tools/brat?text=${query}`, global.packname, global.author)
   conn.sendFile(m.chat, brats, null, { asSticker: true }, m, null, m)
 }
handler.help = handler.command = ['brat']
handler.tags = ['convert']
export default handler
