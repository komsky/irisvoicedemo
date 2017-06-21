import api from '../api'
import { getItem } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { confirmationModel } from '../../model'
import { formatPath, slotsFilled, slotFilled  } from '../../utils'
import { path } from 'ramda'
const get = api(getItem.method)

const item = path([ 'HotelItems', 'categories', 'lights_on'], sections)
const pathName = formatPath(item.code, getItem.path)

//const isFilled = slotsFilled(confirmationModel)
//const confirmationFilled = slotFilled(confirmationModel.confirmationSelection)

const doLightsOn = async (payload) => {
  const { intent: { slots: { confirmationSlot: {value} }, confirmationStatus }, dialogState } = payload.request
  console.log('doLightsOn')
  console.log('----------------------------------------------')
  console.log('----------------------------------------------')
  console.log('----------------------------------------------')
  console.log('----------------------------------------------')
  console.log('----------------------------------------------')
  console.log('----------------------------------------------', value)
  if ((value !== null) && (value === 'yes' || value === 'confirmed' || value === 'confirm')) {
    console.log('doLightsOn confirmationStatus = CONFIRMED ')
    const res = await get(pathName, payload)

    return {
      text: res.responses[0][getItem.key].content.longDescription,
      options: { shouldEndSession: true },
      session: res.session
    }
  } else if ((value !== null) && (value === 'no' || value === 'not' || value === 'reject')) {
    return {
      text: "Your request was cancelled, thank you.",
      options: { shouldEndSession: true },
      session: res.session
    }
  }

  return {
      directives: [
        {
          type: 'Dialog.ElicitSlot',
          slotToElicit: 'confirmationSlot'
        }
      ],
      text: 'Please confirm you wish to continue; You can simply say; yes; or; no',
      reprompt: 'I didn\'t quite catch that; You can simply say; yes; or; no',
      options: { shouldEndSession: false },
      session: {}
    }
}
export default doLightsOn