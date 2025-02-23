import fs from 'fs'
import path from 'path'

const handler = async (m, { conn}) => {
const directory = './system/sessions';
function deleteFilesExceptOne(directory, fileNameToKeep) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Terjadi kesalahan:', err);
      return;
    }
    
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (file !== fileNameToKeep) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Gagal menghapus file ${file}:`, err);
          } else {
            console.log(`File ${file} berhasil dihapus.`);
          }
        });
      }
    });
  });
}
deleteFilesExceptOne(directory, 'creds.json');
m.reply('Suskess Clear all sessions ✅')
}
handler.command = handler.help = ['cssi']
handler.tags = ['owner']
handler.owner = true
export default handler