import api from '../api'
import { getItem, getCategoryItems, serviceRequest } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { foodModel } from '../../model'
import { formatPath, slotsFilled, slotFilled, buildServiceRequest, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
const get = api(getItem.method)
const put = api(serviceRequest.method)

const items = path([ 'HotelItems', 'service_requests' ], sections)
const pathName = formatPath(items, getCategoryItems.path)

const submitServiceRequest = (slots, items) => {
  const payload = buildServiceRequest(foodModel)(slots, items)
  put(serviceRequest.path, payload)
}

const buildServicesText = items => {
  const itemsText = items.map(x => x.name).join(',')
  return `We offer the following services, please select from the following ${itemsText}`
}

const getServicesInformation = async (payload) => {
  const { intent: { slots, confirmationStatus }, dialogState } = payload.request

  const res = await get(pathName, payload)
  const items = res.responses[0][getCategoryItems.key].content.categoryItems.slice(9, 12)

  // CHECK IF ALL SLOTS ARE FILLED
  // IF YES, SUBMIT, ELSE CARRY ON AS NORMAL
  if (dialogState === 'COMPLETED' && confirmationStatus === 'CONFIRMED') {
    // PSEUDO FOR NOW
    submitServiceRequest(slots, items)
    return {
      text: 'OK that’s all done, we\'ll be with you in a short time',
      options: { shouldEndSession: true },
      session: {}
    }
  }

  return {
        directives: [
          {
            type: 'Dialog.ElicitSlot',
            slotToElicit: 'mainsOptions'
          }
        ],
        text: buildServicesText(items),
        reprompt: 'I didn\'t quite catch that. Could you repeat please?',
        options: { shouldEndSession: false },
        session: {}
      }

}

export default getServicesInformation
