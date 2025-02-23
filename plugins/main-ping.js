import speed from "performance-now";
import { exec } from "child_process";

let handler = async (m) => {
    let timestamp = speed();
    let latensi = (speed() - timestamp).toFixed(4);
    
    exec("neofetch --stdout", (error, stdout) => {
        let child = stdout.toString("utf-8").replace(/Memory:/, "Ram:");
        m.reply(`*PONG:* \`${latensi}\` _ms_ 🟢`);
    });
};

handler.help = ["ping"];
handler.tags = ["main"];
handler.command = ["ping", "speed"];

export default handler;