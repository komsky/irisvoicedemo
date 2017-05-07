require('babel-register');
require('dotenv').load();

const app = require('./src/server')

const port = process.env.PORT || 3000


app.post('/', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    console.log('POST >>>>', data)
  })
})
app.put('/', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    console.log('PUT >>>>', data)
  })
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
