import api from '../api'
import { getItem, getCategoryItems, addServiceRequest } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { serviceRequestTimeOptionsModel } from '../../model'
import { formatPath, slotsFilled, slotFilled, buildServiceRequest, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
const get = api(getItem.method)
const put = api(addServiceRequest.method)

const item = path([ 'HotelItems', 'service_requests', 'check_out' ], sections)
const pathName = formatPath(item.id, getCategoryItems.path)
const itemCode = item.code

const deliveryTimeFilled = slotFilled(serviceRequestTimeOptionsModel.serviceRequestTimeOptions)

const submitServiceRequest = (slots, items) => {
  const payload = buildServiceRequest(serviceRequestTimeOptionsModel)(slots, items)
  put(sendServiceRequest.path, payload)
}

const buildTimeOptionsText = items => {
  const itemsText = items.map(x => x.name).join(',')
  return `We have some great things in on the in-room dining menu tonight. Here are three options, which one would you like? ${itemsText}`
}

const getInvalidSlots = (slots, model) =>
  Object.entries(slots).reduce((acc, [ k, v ]) => {
    const { value } = v
    if (value) {
      if (model.slots[k].options.map(lower).indexOf(lower(value)) < 0) acc.push(k)
    }
    return acc
  }, [])

const doRequestCheckOut = async (payload) => {
  const { intent: { slots, confirmationStatus }, dialogState } = payload.request

  const res = await get(pathName, payload)
  const items = res.responses[0][getCategoryItems.key].content.categoryItems

  // CHECK IF ALL SLOTS ARE FILLED
  // IF YES, SUBMIT, ELSE CARRY ON AS NORMAL
  if (dialogState === 'COMPLETED' && confirmationStatus === 'CONFIRMED') {
    // PSEUDO FOR NOW
    submitServiceRequest(slots, items, itemCode)
    return {
      text: 'OK that’s done, you can ask me for an update on your order at anytime',
      options: { shouldEndSession: true },
      session: {}
    }
  }

  if (!isFilled(slots)) {

    const invalidSlots = getInvalidSlots(slots, serviceRequestTimeOptionsModel)

    // THERE'S AN INVALID OPTION IN SLOTS SOMEWHERE
    if (!isEmpty(invalidSlots)) {
      const { invalidReprompt, options } = serviceRequestTimeOptionsModel.slots[invalidSlots[0]]
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

    const { prompt, options } = serviceRequestTimeOptionsModel.slots[emptySlots[0]]
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

export default doRequestCheckOut
