import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import Vei from './storage/function.js';

//SETTINGS BOT
global.setting = {
 autoclear: false,
 addReply: false
 }
global.owner = [
['62xxx', 'Shyro', true]
]
global.write_store = false

global.info = {
 nomerbot: '62xxx',
 pairingNumber: '62xxx',
 nameown: 'Shyro',
 nomerown: '',
 packname: 'Sticker Created By',
 author: '@veikone_assistant_bot',
 namebot: 'Veikonee - AI',
 wm: 'Copyright Veikone - AI',
 stickpack: 'Sticker Created By',
 stickauth: '@veikone_assistant_bot'
}

//THUMBNAIL URL
global.url = {
 profil: 'https://i.ibb.co/3Fh9V6p/avatar-contact.png',
 rules: 'https://files.catbox.moe/sooyy9.jpg',
 thumbnail: 'https://files.catbox.moe/e7tmza.jpg',
 wel: 'https://telegra.ph/file/9dbc9c39084df8691ebdd.mp4', 
 bye: 'https://telegra.ph/file/1c05b8c019fa525567d01.mp4',
}

//SOSMED
global.ling = {
 sgh:  'https://github.com/Aidannd',
 sgc: 'https://chat.whatsapp.com/H7Qhzxloj3XDSU2ROi8nrh',
 sch: 'https://whatsapp.com/channel/0029VaoSyop6xCSQmU0Fiq2c',
 sid: '120363337810931526@newsletter'
}

//WAIT MESEJ
global.msg = {
 wait: '⏱️',
 error: 'An error occurred'
}
//FUNC
global.Func = Vei
global.func = await import('./storage/functions.js').then(loli => new loli.default());
global.Upload = (await import('./storage/uploaderV2.js')).default;
//RPG
global.multiplier = 69
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
      let emot = {
      agility: '🤸‍♂️',
      arc: '🏹',
      armor: '🥼',
      bank: '🏦',
      bibitanggur: '🍇',
      bibitapel: '🍎',
      bibitjeruk: '🍊',
      bibitmangga: '🥭',
      bibitpisang: '🍌',
      bow: '🏹',
      bull: '🐃',
      cat: '🐈',
      chicken: '🐓',
      common: '📦',
      cow: '🐄',
      crystal: '🔮',
      darkcrystal: '♠️',
      diamond: '💎',
      dog: '🐕',
      dragon: '🐉',
      elephant: '🐘',
      emerald: '💚',
      exp: '✉️',
      fishingrod: '🎣',
      fox: '🦊',
      gems: '🍀',
      giraffe: '🦒',
      gold: '👑',
      health: '❤️',
      horse: '🐎',
      intelligence: '🧠',
      iron: '⛓️',
      keygold: '🔑',
      keyiron: '🗝️',
      knife: '🔪',
      legendary: '🗃️',
      level: '🧬',
      limit: '🌌',
      lion: '🦁',
      magicwand: '⚕️',
      mana: '🪄',
      money: '💵',
      mythic: '🗳️',
      pet: '🎁',
      petFood: '🍖',
      pickaxe: '⛏️',
      pointxp: '📧',
      potion: '🥤',
      rock: '🪨',
      snake: '🐍',
      stamina: '⚡',
      strength: '🦹‍♀️',
      string: '🕸️',
      superior: '💼',
      sword: '⚔️',
      tiger: '🐅',
      trash: '🗑',
      uncommon: '🎁',
      upgrader: '🧰',
      wood: '🪵'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }
}

// APIKEY?
global.api = {
 lol: 'GataDios'
}
global.APIs = {
  lol: "https://api.lolhumaan.xyz",
  ar: "https://api.arifzyn.tech"
}
global.APIKeys = {
    "https://api.lolhumaan.xyz": "GataDios"
}
//DANGER LINE
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
