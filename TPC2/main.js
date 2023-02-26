var http = require('http')
var url = require('url')
var fs = require('fs')

var myserver = http.createServer(function (req, res) {
    var q = url.parse(req.url, true)
    
    var numPag = q.pathname.split("/")

    path = ""
    if (numPag[1].length == 0)
        path = 'index.html'
    else{
        path = 'files/arq' + numPag[1] + '.xml'
        console.log(numPag)
    }
    fs.readFile(path, function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        if(err)
            res.write("Erro: " + err)
        else
            res.write(data)
        res.end()
    })
})

myserver.listen(7777)