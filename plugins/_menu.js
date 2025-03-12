/*
- Shyro Soft
*/

let h = async (m, { conn, usedPrefix }) => {
  const t = {};
  const x = db.data.users[m.sender];
  const { premium, limit, role, name } = x || {};
  const c = {
    main: "🌸 main",
    btmenu: "🌸 Bot",
    ai: "🌸 ai",
    download: "🌸 Downloader",
    fun: "🌸 Fun",
    convert: "🌸 Sticker",
    tool: "🌸 Tools",
    anonymous: "🌸 Anonymous",
    audio: "🌸 Audio changer",
    internet: "🌸 internet",
    islam: "🌸 Islam",
    anim: "🌸 Anime",
    other: "🌸 Other"
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
              const isPremium = plugin.premium ? " `🄿`" : "";
              t[tag].push(`⎔ ${usedPrefix}${capitalizedCmd}${isPremium}`);
            }
          });
        }
      });
    });

  const sm = {
    info: `*👋 Hai Kak ${name}! Saya adalah Shiro-MD, WhatsApp Bot yang siap membantu anda setiap hari!* \n\n╭┄┄┄┄┄┄┄「 *👤 User Info* 」\n*│ 🌿 Name:* ${name || "unknown"}\n*│ 🌿 Limit:* ${limit || "NaN"}\n*│ 🌿 Role:* ${role || "ShiroMD User ✨"}\n*│ 🌿 Status:* ${premium ? "Premium" : "Regular"}\n*│ 🌿 Version:* v1.0.0 \n╰┄┄┄┄┄┄┄`,
    firstHeader: (tag) => `*╭┈┈┈┈「 ${tag.toUpperCase()} 」*`,
    header: (tag) => `*┆┄┄「 ${tag.toUpperCase()} 」*`,
    footer: `*╰┈┈┈┈*`
  };

  const ot = ['main', 'btmenu', 'ai', 'download', 'fun', 'convert', 'tool', 'anonymous', 'audio', 'internet', 'islam', 'anim', 'other'];
  let allCmds = ot.map((tag, i) => {
    if (t[tag]) {
      const cmds = t[tag].join('\n*┆* ');
      return [
        i === 0 ? sm.firstHeader(c[tag]) : sm.header(c[tag]),
        `*┆* ${cmds}`
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
      newsletterJid: '120363367487165652@newsletter',
      newsletterName: "ShiroMD's Information",
      serverMessageId: 143
    },
    externalAdReply: {
      title: `${ucapan}`,
      body: 'How Can I Help You Today?',
      thumbnailUrl: thumb,
      mediaType: 1,
      sourceUrl: '🌸 *MENU INI DISEMBUNYIKAN OLEH OWNER.*',
      renderLargerThumbnail: true
    }
  }
}, { 
  quoted: {
    key: { 
      fromMe: false, 
      participant: '13135550002@s.whatsapp.net', 
      id: 'fake-msg-id' 
    },
    message: { 
      conversation: `Shiro MD || Made by Pikok`
    }
  }
})
};

h.help = ['menu'];
h.command = ['menu', 'help', 'manuk'];
export default h;
