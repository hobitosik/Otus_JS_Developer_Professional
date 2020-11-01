const http = require('http') 
const hostname = 'localhost'
const port = 3000
const fs = require('fs')

const server = http.createServer(( request, response ) => {

    console.log(`Запрошенный адрес: ${request.url}`);
    // получаем путь после слеша
    const filePath = request.url === "/" ? 'index.html' : request.url.substr(1);
    // смотрим, есть ли такой файл
    fs.access( filePath, fs.constants.R_OK, err => {
        // если произошла ошибка - отправляем статусный код 404
        if( err ){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }else fs.createReadStream( filePath ).pipe( response )
    });

}) 

server.listen( port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
