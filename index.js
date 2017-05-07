require('babel-register');
require('dotenv').load();

const app = require('./src/server')
const responsePrimitive = require('./config/responsePrimitive')

const port = process.env.PORT || 3000


app.post('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.writeHead(200)
  responsePrimitive.response.outputSpeech.text = 'We are in the Hendon Hotel on Shiny Boulevard.'
  res.end(JSON.stringify(responsePrimitive))
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
