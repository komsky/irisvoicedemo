import api from '../api'
import { getItem, getCategoryItems } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { foodModel } from '../../model'
import { formatPath, slotsFilled, slotFilled } from '../../utils'
import { path, pick } from 'ramda'
const get = api(getItem.method)

const mains = path([ 'foodAndDrink', 'categories', 'roomService' ], sections)
const pathName = formatPath(mains.id, getCategoryItems.path)

const isFilled = slotsFilled(foodModel)
const isTriggerFilled = slotFilled(foodModel.slots.delegateTrigger)
const mainsFilled = slotFilled('mainsOptions')
const cookingFilled = slotFilled('cookingOptions')

const submitOrder = () => console.log('SUBMITTING ORDER >>>>>>') //eslint-disable-line

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
  const { attributes = {}, new: newSession } = payload.session
  const paging = path([ 'session', 'paging' ], attributes)
  const { page = 0, size = 3 } = paging || {}
  const { intent: { slots }, dialogState } = payload.request

  const res = await get(pathName, payload)

  // CHECK IF ALL SLOTS ARE FILLED
  // IF YES, SUBMIT, ELSE CARRY ON AS NORMAL
  if (dialogState === 'COMPLETED') {
    // PSEUDO FOR NOW
    submitOrder()
    return {
      text: 'I have submitted your order to the hotel!',
      options: { shouldEndSession: true },
      session: {}
    }
  } else {
    const items = res.responses[0][getCategoryItems.key].content.categoryItems.slice(9,12)
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
      console.log('SLOTS >>>>>>>', slots)
      // const selected = items.find(x => (x.name === slots.mainsOptions.value.toLowerCase() || x.name === "flatiron steak"))
      const selected = items.find(x => x.name === "Flat Iron Steak")
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

    // const originalSesssion = newSession ? res.session : payload.session.attributes
    // const session = { ...originalSesssion.session, paging: { page: page + 1, size: 3 } }
  }
}

export default getFoodInformation
