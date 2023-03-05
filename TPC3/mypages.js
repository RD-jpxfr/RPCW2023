exports.pessoasPage = function(lista){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css">
            <title>About People...</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Pessoas</h1>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                        </tr>
    `
    
    for(let i=0; i<lista.length; i++){
        pagHTML += `
                        <tr onclick="window.location='http://localhost:3000/pessoas/${lista[i].id}';">
                            <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td><td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                        </tr>
        `
    }
    
    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return pagHTML
}