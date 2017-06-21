
export default {
  slots: {
    confirmation: {
      options: [ 'Confirmed', 'Cancelled'],
      invalidReprompt: 'That option is unavailable. Could you repeat please? ',
      reprompt: 'I didn\'t quite catch that. Could you repeat please? '
    }
  },
  required: [
    'confirmation'
  ],
  confirmationSelection: 'confirmation'
}