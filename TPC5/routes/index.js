var express = require('express')
var router = express.Router()
var axios = require('axios')


function recuperaInfo(request, callback) {
  dat = new Date().toISOString().substring(0, 10)

  if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
      let body = ''
      request.on('data', bloco => {
          body += bloco.toString()
      })

      request.on('end', () => {
          body += "&data_post=" + dat
          body += "&type=porfazer"
          callback(parse(body))
      })
  }
}

function recuperaID(request, callback) {
  dat = new Date().toISOString().substring(0, 16)

  if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
      let body = ''
      request.on('data', bloco => {
          body += bloco.toString()
      })

      request.on('end', () => {
          callback(parse(body))
      })
  }
}


function callMainPage(res) {
  const req1 = axios.get("http://localhost:3000/tarefas?type=realizada")
  const req2 = axios.get("http://localhost:3000/tarefas?type=porfazer")

  axios.all([req1, req2])
      .then(axios.spread((...responses) => {

          const tf = responses[0];
          const tpf = responses[1];

          tasksF = tf.data;
          tasksPF = tpf.data;

          // Add code to render page with the student's list
          res.render('index', {tasksF: tasksF, tasksPF: tasksPF})
      }))

      .catch(function (erro) {
          res.render('error', {error: erro})
      })
}

function postForm(req, res){
  recuperaInfo(req, resultado => {
      console.log('POST de tarefa:' + JSON.stringify(resultado))
      axios.post('http://localhost:3000/tarefas', resultado)
          .then(resp => {
              callMainPage(res);
          })
          .catch(error => {
              res.render('error', {error: erro})
          })
  })
}

function postDone(req, res){
  recuperaID(req, resultado => {
      console.log('POST de tarefa:' + JSON.stringify(resultado))

      id = resultado["id"];

      myurl = 'http://localhost:3000/tarefas/' + id

      axios.get(myurl)
          .then(function (resp) {
              task = resp.data;

              task.type = "realizada";

              axios.put(myurl, task)
                  .then(resp => {
                      callMainPage(res);
                  })
                  .catch(error => {
                      res.render('error', {error: erro})
                  })
          })
          .catch(error => {
              console.log(error);
          });
  })
}

function postDelete(req, res){
  recuperaID(req, resultado => {
      console.log('POST de tarefa:' + JSON.stringify(resultado))

      id = resultado["id"];

      myurl = 'http://localhost:3000/tarefas/' + id

      axios.delete(myurl, {})
          .then((resp) => {
              callMainPage(res);
          }).catch(error => {
              console.log(error);
          });
  })
}

function postEdit(req, res){
  recuperaID(req, resultado => {
      console.log('POST de tarefa:' + JSON.stringify(resultado))

      id = resultado["id"];

      myurl = 'http://localhost:3000/tarefas/' + id

      axios.get(myurl)
          .then(function (resp) {
              task = resp.data;

              task.type = "realizada";

              axios.put(myurl, task)
                  .then(resp => {
                      callMainPage(res);
                  })
                  .catch(error => {
                      res.render('error', {error: erro})
                  })
          })
          .catch(error => {
              console.log(error);
          });
  })
}


// GET /alunos --------------------------------------------------------------------
router.get('/', function(req, res, next) {
  callMainPage(res)
})

router.post('/', function(req, res, next) {
  postForm(req, res)
})

router.post('/tarefas/completa', function(req, res, next) {
  postDone(req, res)
})

router.post('/tarefas/delete', function(req, res, next) {
  postDelete(req, res)
})

router.post('/tarefas/edit', function(req, res, next) {
  postEdit(req, res)
})


module.exports = router;
