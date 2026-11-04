import http from "node:http";
const fs = require('fs')

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

const server = http.createServer(async (req, res) => {
    var uri = url.parse(req.url).pathname;
    if(req.url == '/chimps-7400025.jpg') { // image loading
        var mimeType = mimeTypes[path.extname('chimps-7400025.jpg').split(".").reverse()[0]];
        res.writeHead(200, {'Content-Type': mimeType} );
        var fileStream = fs.createReadStream('./chimps-7400025.jpg');
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
            console.log(await libraryVfaas[body.bundleId].serverless.apply(null, body.args)) // true
            console.log(await db.kv('/data').get('t:null')) // {"v":"2","status":true}
            // ============================ //
            res.end(); 
        });
    
        
        
    }else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const indexHtml = fs.readFileSync('./index.html')
        
        res.end(`
           ${indexHtml.toString()}
        `);
      }

});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080/ ...");
});
