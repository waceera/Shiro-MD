let handler = async (m, { conn, text }) => {
 try {
      const quotes = await katabijak();
      if (quotes.length > 0) {
        const filteredQuotes = quotes.split("\n").filter((_, index) => index !== 1 && index !== quotes.length - 1);
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)].slice(1, -2);
        await conn.sendMessage(m.chat, { text: `_${randomQuote}_` }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { text: "Tidak ada kutipan yang tersedia." }, { quoted: m });
      }
    } catch (error) {
      console.error(error);
      await conn.sendMessage(m.chat, { text: msg.error }, { quoted: m });
  }
}

handler.command = ["quotes"];
handler.help = ["quotes"];
handler.tags = ["other"];
export default handler

async function katabijak() {
  try {
    const url = "https://raw.githubusercontent.com/onlybot12/galau/a3d5c0a37435a9c694c6b69e027385c1fd776df0/katabijak.json";
    let res = await fetch(url);
    return await res.text();
  } catch (error) {
    console.error(error);
    return [];
  }
}