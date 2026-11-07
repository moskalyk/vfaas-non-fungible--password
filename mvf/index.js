import http from "node:http";
const fs = require('fs')
import { sign, verify, constants } from 'node:crypto';
const { generateKeyPairSync } = require('crypto');
const bas = require('./bas.js')
const  url = require('url'),
    path = require('path');

const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

// ========== minVFAAS =========== //
require('../vfaasContext.js')
const funcVerifyPassword = require('../serverless/code/401685.js')
const loadPassword = require('../serverless/code/109948.js')
const isLoaded = require('../serverless/code/347220.js')

const libraryVfaas = { // static
    '109948': loadPassword,
    '347220': isLoaded,
    '401685': funcVerifyPassword
}

// =============================== //

const passphrase = process.argv[2]
console.log(passphrase)

const server = http.createServer(async (req, res) => {
    var uri = url.parse(req.url).pathname;
    if(req.url == '/chimps-7400025.jpg') { // image loading
        var mimeType = mimeTypes[path.extname('chimps-7400025.jpg').split(".").reverse()[0]];
        res.writeHead(200, {'Content-Type': mimeType} );
        var fileStream = fs.createReadStream(__dirname + './chimps-7400025.jpg');
        fileStream.pipe(res);
    } else if(req.url == '/vfaas') {
        
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            body = JSON.parse(body)
            
            res.writeHead(200, { "Content-Type": "text/html" })
            // ========== minVFAAS ======== //
            const output = (await libraryVfaas[body.bundleId].serverless.apply(null, body.args)) // true
            console.log(await db.kv('/data').get('t:null')) // {"v":"2","status":true}
            // ============================ //
            
             const {
              publicKey,
              privateKey,
            } = generateKeyPairSync('rsa', {
              modulusLength: 2048,
              publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
              },
              privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: passphrase,
              },
            });
            
             function signMessage(privateKey, passphrase, message) {
              const signature = sign('sha256', Buffer.from(message), {
                key: privateKey,
                passphrase,
                padding: constants.RSA_PKCS1_PSS_PADDING,   // modern, provably secure
                saltLength: constants.RSA_PSS_SALTLEN_DIGEST,
              });
              return signature.toString('base64');
            }
            
             function verifyMessage(publicKey, message, signatureB64) {
              return verify(
                'sha256',
                Buffer.from(message),
                {
                  key: publicKey,
                  padding: constants.RSA_PKCS1_PSS_PADDING,
                  saltLength: constants.RSA_PSS_SALTLEN_DIGEST,
                },
                Buffer.from(signatureB64, 'base64')
              );
            }
            // ============================ //
            
            const msg = JSON.stringify({args: body.args, output: output})
            const sig = signMessage(privateKey, passphrase, msg);
            
            console.log('valid:', verifyMessage(publicKey, msg, sig));          // true
            
            res.end(JSON.stringify({hash: sig, p2p_bas: bas.encrypt(sig, [passphrase], 1), args: body.args, output: output, verified:  verifyMessage(publicKey, msg, sig)})); 
        });
    
        
        
    } else if(req.url == '/profile'){
        res.end(JSON.stringify({})); 

    } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const indexHtml = fs.readFileSync(__dirname + './index.html')
        
        res.end(`
           ${indexHtml.toString()}
        `);
      }

});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080/ ...");
});
