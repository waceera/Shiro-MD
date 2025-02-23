import ws from "ws";

const base_url = [
    "https://ori-muchim-bluearchivetts.hf.space/",
    "wss://zomehwh-vits-models.hf.space/queue/join",
    "wss://zomehwh-vits-models-pcr.hf.space/queue/join",
    "wss://zomehwh-vits-models-genshin-bh3.hf.space/queue/join",
];

const url_ident = {
    bAV: 0,
    vMV: 1,
};

const generateSession = () => Math.random().toString(36).substring(2);

export async function blueArchiveVoice(data) {
    return new Promise((resolve, reject) => {
        try {
            let { text, model = "Airi", speed = 1.2 } = data;
            if (!text || text.length >= 500)
                throw new Error(`Make sure to enter valid text, that's not exceed 500 words!`);
            if (speed && (speed < 0.1 || speed > 2)) speed = 2;
            model = "JP_" + model;
            const url = base_url[url_ident.bAV];
            const session_hash = generateSession();
            const socket = new ws(url.replace("https", "wss") + "queue/join");
            
            socket.on("message", (data) => {
                const d = JSON.parse(data.toString("utf8"));
                switch (d.msg) {
                    case "send_hash":
                        socket.send(JSON.stringify({ fn_index: 0, session_hash }));
                        break;
                    case "send_data":
                        socket.send(JSON.stringify({ fn_index: 0, session_hash, data: [text, model, speed] }));
                        break;
                    case "process_completed":
                        if (!d.success) return reject(`Error generating: ${JSON.stringify(d, null, 2)}`);
                        const o = d.output;
                        const name = o.data[1]?.name;
                        socket.close();
                        resolve({ text, model, speed, result: { duration: +o.duration.toFixed(2), path: name, url: url + "file=" + name } });
                        break;
                }
            });
        } catch (e) {
            reject(`Error in voice: ${e}`);
        }
    });
}

export async function vitsModelVoice(data) {
    return new Promise((resolve, reject) => {
        try {
            let { text, lang = "japanese", model = "kafka", game = null } = data;
            if (!text || text.length >= 100)
                throw new Error("Enter valid text! Length should be less than 100 characters.");
            lang = lang.toLowerCase();
            model = model.toLowerCase();
            game = game ? game.toLowerCase() : null;
            const session_hash = generateSession();
            const url = base_url[game ? 3 : url_ident.vMV];
            if (!url) throw new Error("Invalid game choice");
            const socket = new ws(url);
            
            socket.on("message", (data) => {
                const d = JSON.parse(data.toString("utf8"));
                switch (d.msg) {
                    case "send_hash":
                        socket.send(JSON.stringify({ fn_index: 0, session_hash }));
                        break;
                    case "send_data":
                        socket.send(JSON.stringify({ fn_index: 0, session_hash, data: [text, lang, 0.6, 0.668, 1, false] }));
                        break;
                    case "process_completed":
                        if (!d.success) return reject(`Error generating: ${JSON.stringify(d, null, 2)}`);
                        const o = d.output;
                        socket.close();
                        resolve({ text, lang, model, game, result: { data: Buffer.from(o.data[1].split(",")[1], "base64"), duration: +o.duration.toFixed(2) } });
                        break;
                }
            });
        } catch (e) {
            reject(`Error in vitsModelVoice: ${e}`);
        }
    });
}