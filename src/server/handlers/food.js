import api from '../api'
import { getItem, getCategoryItems, checkout } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { foodModel } from '../../model'
import { formatPath, slotsFilled, slotFilled, buildOrder, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
const get = api(getItem.method)
const post = api(checkout.method)

const mains = path([ 'foodAndDrink', 'categories', 'roomService', 'subCategories', 'mains' ], sections)
const pathName = formatPath(mains.id, getCategoryItems.path)

const isFilled = slotsFilled(foodModel)
const mainFilled = slotFilled(foodModel.mainSelection)
// const cookingFilled = slotFilled('cookingOptions')

const submitOrder = (slots, items) => {
  const payload = buildOrder(foodModel)(slots, items)
  post(checkout.path, payload)
}

const buildMainsText = items => {
  const itemsText = items.map(x => x.name).join(',')
  return `We have some great things in on the in-room dining menu tonight. Here are three options, which one would you like? ${itemsText}`
}

const buildModifierText = (modifier, prompt) => {
  const options = modifier.modifierOptions.map(x => x.name).join(',')
  const text = prompt || modifier.name.replace(/\(Copy\)/, '')
  return `${text} ${options}`
}

const getInvalidSlots = (slots, model) =>
  Object.entries(slots).reduce((acc, [ k, v ]) => {
    const { value } = v
    if (value) {
      if (model.slots[k].options.map(lower).indexOf(lower(value)) < 0) acc.push(k)
    }
    return acc
  }, [])

const getFoodInformation = async (payload) => {
  const { intent: { slots, confirmationStatus }, dialogState } = payload.request

  const res = await get(pathName, payload)
  const items = res.responses[0][getCategoryItems.key].content.categoryItems.slice(9, 12)

  // CHECK IF ALL SLOTS ARE FILLED
  // IF YES, SUBMIT, ELSE CARRY ON AS NORMAL
  if (dialogState === 'COMPLETED' && confirmationStatus === 'CONFIRMED') {
    // PSEUDO FOR NOW
    submitOrder(slots, items)
    return {
      text: 'OK that’s done, you can ask me for an update on your order at anytime',
      options: { shouldEndSession: true },
      session: {}
    }
  }

  if (!isFilled(slots)) {

    if (!mainFilled(slots)) {
      return {
        directives: [
          {
            type: 'Dialog.ElicitSlot',
            slotToElicit: 'mainsOptions'
          }
        ],
        text: buildMainsText(items),
        reprompt: 'I didn\'t quite catch that. Could you repeat please?',
        options: { shouldEndSession: false },
        session: {}
      }
    }

    const invalidSlots = getInvalidSlots(slots, foodModel)

    // THERE'S AN INVALID OPTION IN SLOTS SOMEWHERE
    if (!isEmpty(invalidSlots)) {
      const { invalidReprompt, options } = foodModel.slots[invalidSlots[0]]
      return {
        directives: [
          {
            type: 'Dialog.ElicitSlot',
            slotToElicit: invalidSlots[0]
          }
        ],
        text: invalidReprompt + options.join(','),
        reprompt: 'I didn\'t quite catch that. Could you repeat please?',
        options: { shouldEndSession: false },
        session: {}
      }
    }

    const emptySlots = Object.entries(slots)
      .filter(([ k, v ]) => !v.value)
      .map(([ k, v ]) => k)

    const { prompt, options } = foodModel.slots[emptySlots[0]]
    return {
      directives: [
        {
          type: 'Dialog.ElicitSlot',
          slotToElicit: emptySlots[0]
        }
      ],
      text: prompt + options.join(','),
      reprompt: 'I didn\'t quite catch that. Could you repeat please?',
      options: { shouldEndSession: false },
      session: {}
    }

  } else {
    return {
      directives: [
        {
          type: 'Dialog.Delegate'
        }
      ],
      options: { shouldEndSession: false },
      session: {}
    }
  }

}

export default getFoodInformation
