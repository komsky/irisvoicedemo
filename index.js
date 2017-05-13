require('babel-register');
require('dotenv').load();

const app = require('./src/server')
const router = require('./src/server/router')

const { middleware } = require('./src/server/middleware')

app.post('/', (req, res, next) => {
  const { session: { application: { applicationId } } } = req.body
  if ( applicationId !=== process.env.APP_ID ) {
    res.writeHead(400)
    res.end('Bad Request')
  }

  res.set('Content-Type', 'application/json');
  res.writeHead(200)
  const response = router(req.body)
  res.end(JSON.stringify(response))
})

app.use(attachSession)


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
