import api from '../api'
import { getCategoryItems, checkout } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { foodModel } from '../../model'
import { formatPath, buildServiceRequest, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
const get = api(getCategoryItems.method)

const items = path([ 'HotelItems', 'in_room_dining' ], sections)
const pathName = formatPath(items.code, getCategoryItems.path)

const getFoodInformation = async (payload) => {

  const { intent: { slots: { mainOptions: { name , value, confirmationStatus } } }, dialogState } = payload.request

  const res = await get(pathName, payload)
  
  // dialogState: 'STARTED' IN_PROGRESS
  if (dialogState == 'STARTED') {

      const items = res.responses[0][getCategoryItems.key].content.categoryItems
      const itemsText = items.map(x => x.name).join(',')
      const returnText = `Please select from the following; ${itemsText}`

      return {
            directives: [
                  {
                    type: 'Dialog.ElicitSlot',
                    slotToElicit: 'mainOptions'
                  }
                ],
                text: returnText,
                reprompt: 'I didn\'t quite catch that. Could you repeat please?',
                options: { shouldEndSession: false },
                session: {}  
          }
  }
  if (value !== null && value !== '') {

      console.log('value = ' , value)
      return {
          text: 'You have selected ${value}; let me get order that for you',
          options: { shouldEndSession: true },
          session: res.session
      }
  }

  return {
          text: 'Sorry, didn\'t get that; please try again',
          options: { shouldEndSession: true },
          session: res.session
      }
}

export default getFoodInformation
