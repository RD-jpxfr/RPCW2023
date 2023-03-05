// pessoas_server.js
// RPCW2023 : 2023-02-27
// by RD

var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function(req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    var dicURL = url.parse(req.url, true)

    if(dicURL.pathname == "/"){
        axios.get("http://localhost:3000/pessoas")
            .then( function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch( error => {
                console.log("Erro: " + error)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })
    }
    else if(dicURL.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                console.log("Erro na leitura da stylesheet")
                res.write("Erro: " + err)
            }
            else
                res.write(data)
            res.end()
        })
    }
    else if(dicURL.pathname == "/ordenada"){
        axios.get("http://localhost:3000/pessoas?sort=nome&order=asc")
            .then( function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch( error => {
                console.log("Erro: " + error)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })
    }
    else if(dicURL.pathname == "/ordenadav2"){
        axios.get("http://localhost:3000/pessoas")
            .then( function(resp){
                var pessoas = resp.data
                var pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? -1 : 1
                    // function(p1, p2){ return (p1.nome < p2.nome) ? -1 : 1 }
                )
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                console.log("1")
                res.end(mypages.pessoasPage(pessoasOrdenadas))
            })
            .catch( error => {
                console.log("Erro: " + error)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("ERRO: Operação não suportada")
    }
}).listen(7777)