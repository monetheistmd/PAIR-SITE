const express = require('express');
const mega = require("megajs");
const fs = require('fs');
const path = require('path');
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState,  Browsers, makeCacheableSignalKeyStore, initAuthCreds } = require('@whiskeysockets/baileys');

let router = express.Router();

const accounts = [

    {
        email: 'Your mega email',
        password: 'Your mega pw',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    }

];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const upload = async (data, name) => {
    console.log(`\n🗂️ Upload started for: ${name}\n`);

    for (let i = 0; i < accounts.length; i++) {
        const auth = accounts[i];
        console.log(`🔁 Attempt ${i + 1} using account: ${auth.email}`);

        try {
            const url = await new Promise((resolve, reject) => {
                const storage = new mega.Storage(auth, () => {
                    const up = storage.upload({ name, allowUploadBuffering: true });
                    data.pipe(up);

                    storage.on("add", file => {
                        file.link((err, url) => {
                            storage.close();
                            if (err) {
                                reject(err);
                            } else {
                                resolve(url);
                            }
                        });
                    });
                });

                storage.on("error", (err) => {
                    reject(err);
                });
            });

            console.log(`✅ Upload successful with account: ${auth.email}`);
            return url;

        } catch (err) {
            console.log(`❌ Upload failed on attempt ${i + 1} with account: ${auth.email}`);
            console.log(`    ⚠️ Reason: ${err.message || err}`);

            
            if (err.message && err.message.includes("EBLOCKED")) {
                console.log("🚫 Account is blocked. Trying next...");
                continue;
            }

            
            if (err.message && err.message.includes("storage is not ready")) {
                console.log("📛 Storage is not ready. Trying next...");
                continue;
            }

           
            if (
                err instanceof TypeError &&
                err.message.includes('The first argument must be of type string')
            ) {
                console.log(`\n♻️ [𝗥𝗘𝗦𝗧𝗔𝗥𝗧] දෝෂයක් හඳුනා ගන්නා ලදි: ${err.message}`);
                await delay(30000);
                console.log("☘️ Process එක නැවත ආරම්භ වේ...");
                process.exit();
            }

            
            continue;
        }
    }

    console.log(`\n⛔ All ${accounts.length} MEGA accounts failed to upload.`);
    throw new Error("All MEGA accounts failed.");
};






function makeid(num = 4) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var characters9 = characters.length;
  for (var i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters9));
  }
  return result;
}


function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
    console.log(`🗑️ [FileSystem] Removed: ${FilePath}`);
}

router.get('/', async (req, res) => {
    const id = makeid();
let num = req.query.number;

  
  return await MONEY_HEIST_MD();  
   
    async function MONEY_HEIST_MD() {
       
      const { state, saveCreds } = await useMultiFileAuthState(`./temp/${num}/` + id);
       
        try {
         const browsers = [
  "Safari"];

            const randomBrowser = browsers[Math.floor(Math.random() * browsers.length)];

            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomBrowser)
            });

      		
		if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const customPairingCode = "FREEBOTS";
    
                const code = await sock.requestPairingCode(num, customPairingCode);

                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            sock.ev.on('creds.update', saveCreds);

            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                  
                    await delay(5000);
                    let rf = __dirname + `/temp/${num}/${id}/creds.json`;






                    

                    try {

                        const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                        const string_session = mega_url.replace('https://mega.nz/file/', '');
                        const sid = string_session;
                        const customMessage = `MONEY-HEIST-MD-${sid}-DILALK`;

                        

                   


                        
if (mega_url && mega_url.startsWith('https://mega.nz/file/')) {
  

  
const phoneNumber = sock.user.id.split(':')[0].replace(/\D/g, '');


  
  
 await sock.sendMessage(phoneNumber, {  
            text: `${customMessage}`  
          });  

  
 


    

}                   
                        
                        


                        
                        
                    } catch (e) {
                        console.error(`❗ [Error]:`, e);
                    }

                    await delay(10);
                    await sock.ws.close();
                    removeFile(`./temp/${num}/` + id);

                  await delay(10);
                    process.exit();

                } else if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== 401) {
                  
                    await delay(10);
                    MONEY_HEIST_MD();
                }
            });

        } catch (err) {
            console.error("❗ [Service Error]:", err);
            removeFile(`./temp/${num}/` + id);
            if (!res.headersSent) {
                
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }

  

    });

module.exports = router;
