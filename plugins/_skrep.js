let handler = m => m;
handler.before = async function(m, { conn }) {
    global.Tik = await import("../storage/scrapers/tiktok.js")
    global.scrap = await import('../storage/scrapers/scraper.js')
};
export default handler;
