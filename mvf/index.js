import http from "node:http";
import formidable, { errors as formidableErrors } from "formidable";

const fs = require('fs')

var  url = require('url'),
    path = require('path');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};
//
const context = require('../vfaasContext.js')
const funcVerifyPassword = require('../serverless/code/401685.js')
const loadPassword = require('../serverless/code/109948.js')
const isLoaded = require('../serverless/code/347220.js')

// const file = fs.createWriteStream("data.txt");

// http.get("http://localhost:8080/media/zod/8758-604A/verbatim/vei/rnft.life/vnt/mvf/scor.png", response => {
//   var stream = response.pipe(file);

//   stream.on("finish", function() {
//     console.log("done");
//   });
// });

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/upload" && req.method.toLowerCase() === "post") {
    // parse a file upload
    const form = formidable({});
    let fields;
    let files;
    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      // example to check for a very specific error
      if (err.code === formidableErrors.maxFieldsExceeded) {
      }
      console.error(err);
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      res.end(String(err));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ fields, files }, null, 2));
    return;
  }
  
  var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), unescape(uri));
    
    console.log('req.url')
    console.log(req.url)
    console.log(filename)
    if(req.url == '/chimps-7400025.jpg') {
        var mimeType = mimeTypes[path.extname(filename).split(".").reverse()[0]];
        res.writeHead(200, {'Content-Type': mimeType} );
        
        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
    } else {
    
        console.log(await loadPassword.serverless(1,1,2,null))
        console.log(await db.kv('/data').get('t:null'))

        // show a file upload form
        res.writeHead(200, { "Content-Type": "text/html" });
        /*
            <form action="/api/upload" enctype="multipart/form-data" method="post">
              <div>Text field title: <input type="text" name="title" /></div>
              <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
              <input type="submit" value="Upload" />
            </form>
        
        */
        res.end(`
            <h2>With Node.js <code>"http"</code> module</h2>
            <canvas id="viewport" width="4200px" height="4200px" ></canvas>
            <body>
    <div>
    <canvas id="canvas" width="420px" height="420px"></canvas>
</div>
</body>
<script>
    const enc = new TextEncoder()
    const dec = new TextDecoder()

    function decrypt(msg, freqs, scalar = 1, timeout=1000) {
        let msgArr = []
        
        let g = 0;
        let f = 0;

        while(g<timeout){

            for(let w = 0; w < freqs.length; w++){
                for(let i = 0; i < scalar*freqs[w].length; i++){
                    if(i%freqs.length){
                        for(let j = 0; j < scalar*freqs[i%freqs.length][i]; j++){
                            f++
                        }
                    } else {
                        for(let j = 0; j < scalar*freqs[w].length; j++){
                            f++
                        }
                    }
                }
            }
            g++
            msgArr.push(msg[f++])
        }

        return dec.decode(new Uint8Array(msgArr))
    }

    function encrypt(msg, freqs, scalar = 1) {
        let encrypted = []
        const rawEnc = enc.encode(msg)
        
        for(let k = 0; k < rawEnc.length; k++){
            for(let w = 0; w < freqs.length; w++){
                for(let i = 0; i < scalar*freqs[w].length; i++){
                    if(i%freqs.length){
                        for(let j = 0; j < scalar*freqs[i%freqs.length][i]; j++){
                                encrypted.push(Math.floor(Math.random()*128))
                        }
                    }else {
                        for(let j = 0; j < scalar*freqs[w].length; j++){
                                encrypted.push(Math.floor(Math.random()*128))
                        }
                    }
                }
            }
            encrypted.push(rawEnc[k])
        }
        
        return encrypted
    }

    // Box width
    var bw = 400;
    // Box height
    var bh = 400;
    // Padding
    var p = 10;
    
    const canvas = document.querySelector('canvas')
    
    var canvas1 = document.getElementById('viewport'),
    context1 = canvas1.getContext('2d');
    
make_base();

function make_base() {
  base_image = new Image();
  base_image.src = '/chimps-7400025.jpg';
  base_image.onload = function(){
    context.drawImage(base_image, 0, 0, 600, 600)
  }
}

    var context = canvas.getContext("2d");
    function drawBoard(){
        for (var x = 0; x <= bw; x += 40) {
            context.moveTo(0.5 + x + p, p);
            context.lineTo(0.5 + x + p, bh + p);
        }

        for (var x = 0; x <= bh; x += 40) {
            context.moveTo(p, 0.5 + x + p);
            context.lineTo(bw + p, 0.5 + x + p);
        }
        context.strokeStyle = "black";
        context.stroke();
    }

    drawBoard();
    
    const points = []
    const solution = [
    [ 140, 104.08332824707031 ],[ 298, 150.0833282470703 ], [ 214, 204.0833282470703 ], [ 184, 203.0833282470703 ], [ 176, 311.0833282470703 ], [ 21, 267.0833282470703 ], [ 299, 254.0833282470703 ], [ 13, 159.0833282470703 ], [ 96, 210.0833282470703 ]]

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("x: " + x + " y: " + y)
        
        points.push([x,y])
        
        console.log('matchy', JSON.stringify([116,101,115,116]) == JSON.stringify(encrypt('test',[220,251])))
        
        if(points.every((ep, i) => {return Math.abs(solution[i][0] - ep[0]) < 15}) && points.length == solution.length){
            alert('success')
        }
    }

    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e)
    })
</script>
        `);
      }

});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080/ ...");
});
