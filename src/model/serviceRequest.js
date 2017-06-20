export default {
  slots: {
    serviceRequestTimeOptions: {
      options: [ 'As soon as Possible', 'In half an hour', 'Tomorrow morning' ],
      invalidReprompt: 'That option isn\'t available. Please choose another. ',
      reprompt: 'I didn\'t quite catch that. Could you repeat please? '
    }
  },
  required: [
    'serviceRequestTimeOptions'
  ],
  serviceRequestTimeOptions: 'serviceRequestTimeOptions'
}