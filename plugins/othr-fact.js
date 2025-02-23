import fs from "fs";
const factList = JSON.parse(fs.readFileSync("./system/fact.json", "utf-8"));

let handler = async (m, { conn }) => {
 try {
 const fact = factList[Math.floor(Math.random() * factList.length)];
 const text = `_${fact}_`;
 m.reply(text);
 } catch (e) {
  console.log(e);
  m.reply("An error occurred")
 }
}

handler.command = ["fact","randomfact"];
handler.help = ["fact"];
handler.tags = ["other"];
export default handler