import fs from 'fs';

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} *<filename>*`;

  if (command === "sf") {
    if (!m.quoted) throw `Kirim kodenya sayank`;
    const path = `plugins/${text}.js`;
    await fs.writeFileSync(path, m.quoted.text);
    const key = await conn.sendMessage(
      m.chat,
      { text: "*[ VERIFIKASI KODE... ]*" },
      { quoted: m }
    );
    await conn.sendMessage(
      m.chat,
      {
        text: `*[ SUCCES MENYIMPAN KODE ]*`,
        edit: key.key,
      },
      { quoted: m }
    );
  } else if (command === "df") {
    const path = `plugins/${text}.js`;
    const key = await conn.sendMessage(
      m.chat,
      { text: "*[ MENGHAPUS FILE... ]*" },
      { quoted: m }
    );
    if (!fs.existsSync(path)) {
      return conn.sendMessage(
        m.chat,
        { text: `*[ FILE TIDAK ADA ]*`, edit: key.key },
        { quoted: m }
      );
    }
    fs.unlinkSync(path);
    await conn.sendMessage(
      m.chat,
      { text: `*[ SUKSES MENGHAPUS FILE ]*`, edit: key.key },
      { quoted: m }
    );
  }
};

handler.help = ["sf", "df"];
handler.tags = ["owner"];
handler.command = /^(sf|df)$/i;
handler.rowner = true;
export default handler;