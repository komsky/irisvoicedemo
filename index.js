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

// const Alexa = require('alexa-sdk');
//
// exports.handler = (event, context, callback) => {
//   const alexa = Alexa.handler(event, context);
//   alexa.APP_ID = process.env.APP_ID;
//   alexa.registerHandlers(handlers);
//   alexa.execute();
// };
//
// const handlers = {
//   'LaunchRequest': function() {
//     this.emit('GetHotelInformation');
//   },
//   'GetHotelInformation': function() {
//     this.emit(':tell', 'We are at Hendon Hotel!')
//   }
// }
