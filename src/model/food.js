
export default {
  slots: {
    mainsOptions: {
      options: [ 'Flat Iron Steak', 'Falafel', '12 oz Sirloin Steak' ],
      invalidReprompt: 'That option is unavailable. Please choose another option.',
      reprompt: 'I didn\'t quite catch that. Could you repeat please?'
    },
    cookingOptions: {
      options: [ 'Rare', 'Medium Rare', 'Medium', 'Well Done' ],
      invalidReprompt: 'That option is unavailable. Please choose another option.',
      reprompt: 'I didn\'t quite catch that. Could you repeat please?'
    },
    sauceOptions: {
      options: [ 'No Sauce', 'Horseradish', 'Bearnaise', 'Peppercorn' ],
      invalidReprompt: 'That option is unavailable. Please choose another option.',
      reprompt: 'I didn\'t quite catch that. Could you repeat please?'
    },
    sideOptions: {
      options: [ 'Roasted Aubergine', 'Creamed Spinach', 'Salad', 'Fries' ],
      invalidReprompt: 'That option is unavailable. Please choose another option.',
      reprompt: 'I didn\'t quite catch that. Could you repeat please?'
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
