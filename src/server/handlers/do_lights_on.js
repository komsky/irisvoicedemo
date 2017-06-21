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
  const { intent: { slots, confirmationStatus }, dialogState } = payload.request
  // CHECK IF ALL SLOTS ARE FILLED
  // IF YES, SUBMIT, ELSE CARRY ON AS NORMAL
  if (dialogState === 'COMPLETED' && confirmationStatus === 'CONFIRMED') {
    
    const res = await get(pathName, payload)

    // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
    return {
      text: res.responses[0][getItem.key].content.longDescription,
      options: { shouldEndSession: true },
      session: res.session
    }
  }

  if (!confirmationFilled(slots)) {
      console.log('confirmationFilled not filled')
      return {
        directives: [
          {
            //type: 'Dialog.ElicitSlot',
            type: 'Dialog.Delegate',
            slotToElicit: 'confirmation'
          }
        ],
        text: 'Please confirm you wish to continue',
        reprompt: 'I didn\'t quite catch that. Could you repeat please?',
        options: { shouldEndSession: false },
        session: {}
      }
    } else {
      console.log('confirmationFilled filled')
    }

  /*if (!isFilled(slots)) {
    console.log('Slots not filled')

    

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
  }*/
}
export default doLightsOn