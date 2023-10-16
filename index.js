const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 8080;

const httpServer = http.createServer(httpHandler);

httpServer.listen(port, host, () => {
    console.log(`HTTP server running at http://${host}:${port}/`);
});

function servePage(fileName, res) {
    fs.readFile(`./${fileName}`, function (err, data) {
        if (err == null) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            res.end();
        }
    })
}

function httpHandler(req, res) {
    if (req.url == "/") {
        console.log(req.url)
        servePage('index.html', res);
    }
    else if(fs.existsSync(`./${req.url}.html`)) {
        servePage(`${req.url}.html`, res);
    }
    else {
        console.log(req.url)
        servePage('404.html', res);
    }
}
