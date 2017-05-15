
import { pick } from 'ramda'

const getSelection = (model, items) =>
  items.find(x => x.name === model.slots.delegateTrigger)

const getModifier = modifiers => name =>
  modifiers.modifierOptions.find(x => x.name === name)

const mapModifiers = (selections, modifiers) =>
  selections.map(getModifier(modifiers))

const createOrder = model => (slots, items) => {
  const mainSelection = getSelection(model, items)
  const { itemCode, modifiers, code } = mainSelection || {}


  const flat = Object.entries(slots).map(([k, v]) => v.name)
  const options = flat.splice(flat.indexOf(model.delegateTrigger), 1)

  const modifierOptions = mapModifiers(options, modifiers)

  return {
    categoryItems: [
      {
        itemCode,
        quantity: 1,
        posItemCode: code, // ??????? is this right ??????
        options: modifierOptions.map(pick([ 'code', 'value' ]))
      }
    ],
    checkout: {
      // NOTE fill this d'oh
    }
  }
}

{
  "categoryItems": [
    {
      "itemCode": "sample string 1",
      "quantity": 2,
      "posItemCode": "sample string 3",
      "options": [
        {
          "code": "sample string 1",
          "value": "sample string 2",
          "posItemCode": "sample string 3"
        },
        {
          "code": "sample string 1",
          "value": "sample string 2",
          "posItemCode": "sample string 3"
        }
      ]
    },
    {
      "itemCode": "sample string 1",
      "quantity": 2,
      "posItemCode": "sample string 3",
      "options": [
        {
          "code": "sample string 1",
          "value": "sample string 2",
          "posItemCode": "sample string 3"
        },
        {
          "code": "sample string 1",
          "value": "sample string 2",
          "posItemCode": "sample string 3"
        }
      ]
    }
  ],
  "checkout": {
    "pin": "sample string 1",
    "comment": "sample string 2",
    "numberOfGuests": 1,
    "deliveryDateTime": "2017-05-15T22:42:56.0920753+00:00",
    "isDeliveryDateTimeUtc": true,
    "total": 1.0
  },
  "justValidateDeliveryTime": true,
  "sessionToken": "sample string 2"
}
