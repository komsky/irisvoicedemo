require('babel-register');
require('dotenv').load();

const app = require('express')()
const router = require('./src/server/router')
const bodyParser = require('body-parser')

const { sanitise, endResponse } = require('./src/server/middleware')

app.use(bodyParser.json())

app.post('/', async (req, res, next) => {
  console.log('REQUEST BODY >>>>>') // eslint-disable-line
  console.dir(req.body) // eslint-disable-line
  console.log('INTENT NAME >>>>>>>>>')
  console.dir(req.body.request.intent.name)
  console.log('SLOTS SLOTS SLOTS >>>>>>>>>')

  console.dir(req.body.request.intent.slots)
  const { session: { application: { applicationId } } } = req.body
  process.env['APP_ID'] = 'amzn1.ask.skill.a9b7af41-6a9f-482f-8681-33f8772d1e89';
  console.log('applicationId', applicationId)
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
  if (!res.body) return res.end()
  next()
})

app.use(sanitise)

app.use(endResponse)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`) // eslint-disable-line
})
