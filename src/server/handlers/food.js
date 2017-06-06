import api from '../api'
import { getItem, getCategoryItems, checkout } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { foodModel } from '../../model'
import { formatPath, slotsFilled, slotFilled, buildOrder, lower } from '../../utils'
import { path, pick } from 'ramda'
const get = api(getItem.method)
const post = api(checkout.method)

const mains = path([ 'foodAndDrink', 'categories', 'roomService', 'subCategories', 'mains' ], sections)
const pathName = formatPath(mains.id, getCategoryItems.path)

const isFilled = slotsFilled(foodModel)
const mainsFilled = slotFilled('mainsOptions')
const cookingFilled = slotFilled('cookingOptions')

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
  } else {
    const simpleItems = items.map(pick([ 'itemCode', 'name', 'longDescription', 'price', 'modifiers' ]))

    // MAINS OPTION NOT YET FILLED
    if (!mainsFilled(slots)) {
      return {
        directives: [
          {
            type: 'Dialog.ElicitSlot',
            slotToElicit: 'mainsOptions'
          }
        ],
        text: buildMainsText(simpleItems),
        options: { shouldEndSession: false },
        session: {}
      }
    }

    if (mainsFilled(slots) && !cookingFilled(slots)) {
      const selected = items.find(x => lower(x.name) === lower(slots[foodModel.slots.delegateTrigger].value))
      return {
        directives: [
          {
            type: 'Dialog.ElicitSlot',
            slotToElicit: 'cookingOptions'
          }
        ],
        text: buildModifierText(selected.modifiers[0]),
        options: { shouldEndSession: false },
        session: {}
      }
    }

    if(isFilled(slots)) {
      return {
        directives: [
          {
            type: 'Dialog.Delegate',
            slotToElicit: 'cookingOptions'
          }
        ],
        options: { shouldEndSession: false },
        session: {}
      }
    }
  }
}

export default getFoodInformation
