require('babel-register');
require('dotenv').load();

const app = require('express')()
const router = require('./src/server/router')
const bodyParser = require('body-parser')

const { attachSession } = require('./src/server/middleware')

app.use(bodyParser.json())

app.post('/', async (req, res, next) => {
  const { session: { application: { applicationId } } } = req.body
  if ( applicationId !== process.env.APP_ID ) {
    res.writeHead(400)
    res.end('Bad Request')
  }

  res.set('Content-Type', 'application/json');
  res.writeHead(200)
  try {
    res.body = await router(req.body)
  } catch (err) {
    console.error('ERROR >>>>>', err) // eslint-disable-line
  }

  next()
})

app.use(attachSession)


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`) // eslint-disable-line
})
