const http = require("http");
const path = require("path");
const fs = require("fs");

const fsPromises = require("fs").promises;


const PORT = process.env.PORT || 3500;

 const server = http.createServer( (res, req) => {
        console.log(req.url, req.method)
        let path;
     const extension = path.extension(req.url)
        // if(req.url === '/' || req.url === 'index.html'){
        //     res.statusCode = 200;
        //     res.setHeaders(
        //         'Content-Type', 'text/html'
        //     )
        //     path = path.join(__dirname, 'views', 'index.html');
        //     fs.readFile(path, 'utf-8', (err, data) => {
        //         res.end(data)
        //     })
        // }
 }

 )


 server.listen(PORT, () => console.log(`Server running on port ${PORT}`))