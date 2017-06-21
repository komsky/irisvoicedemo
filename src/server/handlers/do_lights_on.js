import api from '../api'
import { getItem } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { confirmationModel } from '../../model'
import { formatPath, slotsFilled, slotFilled  } from '../../utils'
import { path } from 'ramda'
const get = api(getItem.method)

const item = path([ 'HotelItems', 'categories', 'lights_on'], sections)
const pathName = formatPath(item.code, getItem.path)

const isFilled = slotsFilled(confirmationModel)
const confirmationFilled = slotFilled(confirmationModel.confirmationSelection)

const doLightsOn = async (payload) => {
  const { intent: { confirmationSlot, confirmationStatus }, dialogState } = payload.request
  // CHECK IF ALL SLOTS ARE FILLED
  // IF YES, SUBMIT, ELSE CARRY ON AS NORMAL
  console.log('doLightsOn')
  console.log('confirmationStatus ' , confirmationStatus)
  if (confirmationStatus === 'CONFIRMED') {
    console.log('doLightsOn confirmationStatus = CONFIRMED ')
    const res = await get(pathName, payload)

    // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
    return {
      text: res.responses[0][getItem.key].content.longDescription,
      options: { shouldEndSession: true },
      session: res.session
    }
  }

  

  return {
      directives: [
        {
          type: 'Dialog.ConfirmSlot',
          slotToConfirm: 'confirmationSlot'
        }
      ],
      text: 'Please confirm you wish to continue',
      reprompt: 'I didn\'t quite catch that. Could you repeat please?',
      options: { shouldEndSession: false },
      session: {}
    }
}
export default doLightsOn