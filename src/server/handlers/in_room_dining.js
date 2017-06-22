import api from '../api'
import { getCategoryItems, checkout } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { foodModel } from '../../model'
import { formatPath, buildInRoomDiningOrder, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
const get = api(getCategoryItems.method)
const post = api(checkout.method)

const items = path([ 'HotelItems', 'in_room_dining' ], sections)
const pathName = formatPath(items.code, getCategoryItems.path)

const submitOrder = (slots, items) => {
  const payload = buildOrder(foodModel)(slots, items)
  post(checkout.path, payload)
}

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
      var itemCode
      if (value === `steak` || value === `flatiron steak`) {
        itemCode = path([ 'HotelItems', 'in_room_dining', 'steak', 'code' ], sections)
        itemName = path([ 'HotelItems', 'in_room_dining', 'steak', 'name' ], sections)
      } else if (value === `burger` || value === `h burger` || value === `hamburger`) {
        itemCode = path([ 'HotelItems', 'in_room_dining', 'burger', 'code' ], sections)
        itemName = path([ 'HotelItems', 'in_room_dining', 'steak', 'name' ], sections)
      } else if (value === `Lobster` || value === `Lobster Bisque`) {
        itemCode = path([ 'HotelItems', 'in_room_dining', 'lobster', 'code' ], sections)
        itemName = path([ 'HotelItems', 'in_room_dining', 'steak', 'name' ], sections)
      } else if (value === `Cheese burger`) {
        itemCode = path([ 'HotelItems', 'in_room_dining', 'cheese_burger', 'code' ], sections)
        itemName = path([ 'HotelItems', 'in_room_dining', 'steak', 'name' ], sections)
      } else if (value === `Chocolate cake` || value === `cake`) {
        itemCode = path([ 'HotelItems', 'in_room_dining', 'choc_cake', 'code' ], sections)
        itemName = path([ 'HotelItems', 'in_room_dining', 'steak', 'name' ], sections)
      } else if (value === `Seafood paella` || value === `paella`) {
        itemCode = path([ 'HotelItems', 'in_room_dining', 'paella', 'code' ], sections)
        itemName = path([ 'HotelItems', 'in_room_dining', 'steak', 'name' ], sections)
      } else if (value === `Caesar salad` || value === `salad`) {
        itemCode = path([ 'HotelItems', 'in_room_dining', 'caesar_salad', 'code' ], sections)
        itemName = path([ 'HotelItems', 'in_room_dining', 'steak', 'name' ], sections)
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

      console.log('itemCode = ' , itemCode)
      console.log('itemName = ' , itemName)

      const payload = buildInRoomDiningOrder(itemCode)

      console.log('payload = ' , payload)

      //const res = await post(checkout.path, payload)
      
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
