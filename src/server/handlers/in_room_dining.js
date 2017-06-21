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
  const items = res.responses[0][getCategoryItems.key].content.categoryItems
  const itemsText = items.map(x => x.name).join(',')
  const returnText = `Please select from the following; ${itemsText}`

  // dialogState: 'STARTED' IN_PROGRESS
  if (dialogState == 'STARTED') {

      return {
            directives: [
                  {
                    type: 'Dialog.ElicitSlot',
                    slotToElicit: 'mainOptions'
                  }
                ],
                text: returnText,
                reprompt: `I didn\'t quite catch that. Could you repeat please?`,
                options: { shouldEndSession: false },
                session: {}  
          }
  }
  if (value !== null && value !== ``) {

      console.log(`value = ` , value)
      if (value === `cancel` ) {
        return {
          text: `Your order was cancelled, thank you for using our voice command services`,
          options: { shouldEndSession: true },
          session: res.session
        }
      }

      if (value === `steak` || value === `flatiron steak`) {
        111
      } else if (value === `burger` || value === `h burger` || value === `hamburger`) {
        111
      } else if (value === `Lobster` || value === `Lobster Bisque`) {
        111
      } else if (value === `Cheese burger`) {
        111
      } else if (value === `Chocolate cake` || value === `cake`) {
        111
      } else if (value === `Seafood paella` || value === `paella`) {
        111
      } else if (value === `Caesar salad` || value === `salad`) {
        
      } else {
        return {
            directives: [
                  {
                    type: 'Dialog.ElicitSlot',
                    slotToElicit: 'mainOptions'
                  }
                ],
                text: returnText,
                reprompt: `I didn\'t quite catch that. Could you repeat please?`,
                options: { shouldEndSession: false },
                session: {}  
          }
      }

      submitOrder()
      
      return {
          directives: [
                  {
                    type: 'Dialog.ElicitSlot',
                    slotToElicit: 'confirmationSlot'
                  }
                ],
          text: `You have selected ${value}; is that correct?`,
          options: { shouldEndSession: false },
          session: res.session
      }
  }

  return {
          text: `Sorry, didn\'t get that; please try again`,
          options: { shouldEndSession: true },
          session: res.session
      }
}

export default getFoodInformation
