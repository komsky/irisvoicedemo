
export default {
  slots: {
    mainsOptions: {
      options: [ 'Flat Iron Steak', 'Falafel', '12 oz Sirloin Steak' ],
      invalidReprompt: 'That option is unavailable. Please choose another. ',
      reprompt: 'I didn\'t quite catch that. Could you repeat please? '
    },
    cookingOptions: {
      options: [ 'Rare', 'Medium Rare', 'Medium', 'Well Done' ],
      prompt: 'How would you like it cooked? ',
      invalidReprompt: 'That option is unavailable. Please choose another. ',
      reprompt: 'I didn\'t quite catch that. Could you repeat please? '
    },
    sauceOptions: {
      options: [ 'No Sauce', 'Horseradish', 'Bearnaise', 'Peppercorn' ],
      prompt: 'What sauce would you like with it? ',
      invalidReprompt: 'That option is unavailable. Please choose another. ',
      reprompt: 'I didn\'t quite catch that. Could you repeat please? '
    },
    sideOptions: {
      options: [ 'Roasted Aubergine', 'Creamed Spinach', 'Salad', 'Fries' ],
      prompt: 'What side would you like with it? ',
      invalidReprompt: 'That option is unavailable. Please choose another. ',
      reprompt: 'I didn\'t quite catch that. Could you repeat please? '
    },
  },
  required: [
    'cookingOptions',
    // 'sauceOptions',
    // 'sideOptions',
    'mainsOptions'
  ],
  mainSelection: 'mainsOptions'
}
