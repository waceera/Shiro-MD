/*
- Shyro Soft
*/

let h = async (m, { conn, usedPrefix }) => {
  const t = {};
  const x = db.data.users[m.sender];
  const { premium, limit, role, name } = x || {};
  const c = {
    main: "Main Menu",
    btmenu: "Menu Bot",
    ai: "AI Chat",
    prcs: "AI Processing",
    download: "Downloader",
    convert: "Converter",
    tool: "Utilitas/Tools",
    internet: "Inet/Searching",
    anim: "Anime/Wibuners",
    other: "Random/Other"
  };
  Object.keys(global.plugins)
    .filter(v => !global.plugins[v].disabled)
    .forEach(v => {
      const plugin = global.plugins[v];
      const tags = Array.isArray(plugin.tags) ? plugin.tags : [];
      const help = Array.isArray(plugin.help) ? plugin.help : [plugin.help];

      tags.forEach(tag => {
        if (tag) {
          if (!t[tag]) t[tag] = [];
          help.forEach(cmd => {
            if (typeof cmd === 'string' && cmd.length > 0) { // Validasi cmd
              const capitalizedCmd = cmd.charAt(0).toUpperCase() + cmd.slice(1);
              const isPremium = plugin.premium ? " `Premium CMD`" : "";
              t[tag].push(`⎔ ${usedPrefix}${capitalizedCmd}${isPremium}`);
            }
          });
        }
      });
    });

  const sm = {
    info: `*╔═══「 USER INFO 」*\n*║ Name:* ${name || "Shyro"}\n*║ Limit:* ${limit || "NaN"}\n*║ Role:* ${role || "Veikone User ✨"}\n*║ Status:* ${premium ? "Premium" : "Regular"}\n*╚═══════════════════*`,
    firstHeader: (tag) => `*╔═══「 ${tag.toUpperCase()} 」*`,
    header: (tag) => `*╠═══「 ${tag.toUpperCase()} 」*`,
    footer: `*╚═══════════════════*`
  };

  const ot = ['main', 'btmenu', 'ai', 'prcs', 'download', 'convert', 'tool', 'internet', 'anim', 'other'];
  let allCmds = ot.map((tag, i) => {
    if (t[tag]) {
      const cmds = t[tag].join('\n*║* ');
      return [
        i === 0 ? sm.firstHeader(c[tag]) : sm.header(c[tag]),
        `*║* ${cmds}`
      ].join('\n');
    }
  }).filter(Boolean).join('\n');

  const finalMenu = `${sm.info}\n\n${allCmds}\n${sm.footer}`;
  await conn.sendMessage(m.chat, {
  text: finalMenu,
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363337810931526@newsletter',
      newsletterName: "Veikone AI ChatBOT",
      serverMessageId: 143
    },
    externalAdReply: {
      title: '𝕍𝕖𝕚𝕜𝕠𝕟𝕖 𝔸𝕚 ℂ𝕙𝕒𝕥𝔹𝕆𝕋',
      body: 'ଓ Menu Utama',
      thumbnailUrl: thumb,
      sourceUrl: 'https://chat.whatsapp.com/H7Qhzxloj3XDSU2ROi8nrh',
      mediaType: 1,
      renderLargerThumbnail: true
    }
  }
}, { 
  quoted: {
    key: { 
      fromMe: false, 
      participant: m.sender, 
      id: 'fake-msg-id' 
    },
    message: { 
      conversation: `Hallo ${m.name} ${ucapan} 👋`
    }
  }
})
};

h.help = ['menu'];
h.command = ['menu', 'help', 'manuk'];
export default h;