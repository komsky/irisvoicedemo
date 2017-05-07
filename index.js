require('babel-register');
require('dotenv').load();

// const app = require('./src/server')
//
// const port = process.env.PORT || 3000
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`) // })

const Alexa = require('alexa-sdk');

module.exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = process.env.APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': () => {
    this.emit('GetHotelInformation');
  },
  'GetHotelInformation': () => {
    this.emit(':tell', 'We are at Hendon Hotel!')
  }
}
