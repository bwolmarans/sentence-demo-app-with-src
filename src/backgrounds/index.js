const fs = require('fs')
const http = require('http')

const files = fs.readdirSync('img')
const port = process.env.PORT || 8080

for (let i = files.length - 1; i >= 0; i--) {
  if (files[i][0] === '.') files.splice(i, 1)
}

http.createServer((req, res) => {
  console.log(`==== ${req.method} ${req.url}`);
  console.log('> Headers');
  console.log(req.headers);
  const path = `img/${files[Math.floor(Math.random() * files.length)]}`
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(`Error handling: ${path}\n`)
    } else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.end(data, 'binary')
      console.log ("Serving " + path)
    }
  })
}).listen(port)
console.log('listening on port:', port)/usr/src/app #
