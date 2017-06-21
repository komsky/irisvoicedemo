import api from '../api'
import { getItem } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { confirmationModel } from '../../model'
import { formatPath, slotsFilled, slotFilled  } from '../../utils'
import { path } from 'ramda'
const get = api(getItem.method)

const item = path([ 'HotelItems', 'categories', 'lights_on'], sections)
const pathName = formatPath(item.code, getItem.path)

const doLightsOn = async (payload) => {
  const { intent: { slots: { confirmationSlot: {value} }, confirmationStatus }, dialogState } = payload.request
  if (value !== null) {

    if (value === 'yes' || value === 'confirmed' || value === 'confirm') {
      const res = await get(pathName, payload)

      return {
        text: res.responses[0][getItem.key].content.longDescription,
        options: { shouldEndSession: true },
        session: res.session
      }
    } else if (value === 'no' || value === 'not' || value === 'nope') {
      const res = await get(pathName, payload)

      return {
        text: item.rejectionMsg,
        options: { shouldEndSession: true },
        session: res.session
      }
    }
  }
  
  return {
      directives: [
        {
          type: 'Dialog.ElicitSlot',
          slotToElicit: 'confirmationSlot'
        }
      ],
      text: item.confirmationMsg,
      reprompt: item.repromptMsg,
      options: { shouldEndSession: false },
      session: {}
    }
}
export default doLightsOn