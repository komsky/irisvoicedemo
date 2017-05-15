import api from '../api'
import { getItem, getCategoryItems } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { foodModel } from '../../model'
import { formatPath, slotsFilled, slotFilled } from '../../utils'
import { path, pick } from 'ramda'
const get = api(getItem.method)

const mains = path([ 'foodAndDrink', 'categories', 'roomService', 'subCategories', 'mains' ], sections)
const pathName = formatPath(mains.id, getCategoryItems.path)

const isFilled = slotsFilled(foodModel)
const isTriggerFilled = slotFilled(foodModel.slots.delegateTrigger)

const submitOrder = () => console.log('SUBMITTING ORDER >>>>>>') //eslint-disable-line

const buildText = (first, items) => {
  const itemsText = items.map(x => x.name).join(',')
  if (first) {
    return `We have some great things in on the in-room dining menu tonight. Here are three options, but let me know if you want to hear more. ${itemsText}`
  }
  return `OK, here's three more: ${itemsText}`
}

const getFoodInformation = async (payload) => {
  const { attributes, new: newSession } = payload.session
  const  { paging } = attributes.session || {}
  const { page = 0, size = 3 } = paging || {}
  const { intent: { slots } } = payload.request

  const res = await get(pathName, payload)

  // IF DELEGATE TRIGGER IS FULFILLED, DELEGATE SLOT ELICITATION TO ALEXA
  if (!isFilled(slots) && isTriggerFilled(slots)) {
    return {
      directives: [ { type: 'Dialog.Delegate' } ]
    }
  }

  // CHECK IF ALL SLOTS ARE FILLED
  // IF YES, SUBMIT, ELSE CARRY ON AS NORMAL
  if (isFilled(slots)) {
    // PSEUDO FOR NOW
    submitOrder()
    return {}
  } else {
    const items = res.responses[0][getCategoryItems.key].content.categoryItems

    const simpleItems = items.map(pick([ 'itemCode', 'name', 'longDescription', 'price', 'modifiers' ]))

    let text;
    if (page) {
      text = buildText(false, simpleItems.slice(page * size, (page * size) + size))
    } else {
      text = buildText(true, simpleItems.slice(0, size))
    }

    const originalSesssion = newSession ? res.session : payload.session.attributes
    const session = { ...originalSesssion.session, paging: { page: page + 1, size: 3 } }

    return {
      text,
      session,
      options: { shouldEndSession: false }
    }
  }
}

export default getFoodInformation
