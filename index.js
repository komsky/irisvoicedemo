require('babel-register');
require('dotenv').load();

const app = require('express')()
const router = require('./src/server/router')

const { attachSession } = require('./src/server/middleware')

app.post('/', (req, res, next) => {
  const { session: { application: { applicationId } } } = req.body
  if ( applicationId !== process.env.APP_ID ) {
    res.writeHead(400)
    res.end('Bad Request')
  }

  res.set('Content-Type', 'application/json');
  res.writeHead(200)
  res.body = router(req.body)
  next()
})

app.use(attachSession)


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`) // eslint-disable-line
})
