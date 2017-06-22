import api from '../api'
import { getCategoryItems, getItem, checkout } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { foodModel } from '../../model'
import { formatPath, buildInRoomDiningOrder, lower } from '../../utils'
import { path, isEmpty } from 'ramda'

const get = api(getCategoryItems.method)
const get1 = api(getItem.method)
const post = api(checkout.method)

const items = path([ 'HotelItems', 'in_room_dining' ], sections)
const pathName = formatPath(items.code, getCategoryItems.path)

const getFoodInformation = async (payload) => {

  const { intent: { slots: { mainOptions: { name , value, confirmationStatus } } }, dialogState } = payload.request

  const res = await get(pathName, payload)
  const items = res.responses[0][getCategoryItems.key].content.categoryItems
  const itemsText = items.map(x => x.name).join(',')
  const returnText = `We have some great things on our in room dining menu tonight. Here are some options; ${itemsText}`

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
      var item
      if (value === `steak` || value === `flatiron steak`) {
        item = path([ 'HotelItems', 'in_room_dining', 'steak' ], sections)
      } else if (value === `burger` || value === `h burger` || value === `hamburger`) {
        item = path([ 'HotelItems', 'in_room_dining', 'burger' ], sections)
      } else if (value === `lobster` || value === `lobster bisque`) {
        item = path([ 'HotelItems', 'in_room_dining', 'lobster' ], sections)
      } else if (value === `cheese burger`) {
        item = path([ 'HotelItems', 'in_room_dining', 'cheese_burger' ], sections)
      } else if (value === `chocolate cake` || value === `cake`) {
        item = path([ 'HotelItems', 'in_room_dining', 'choc_cake' ], sections)
      } else if (value === `seafood paella` || value === `paella`) {
        item = path([ 'HotelItems', 'in_room_dining', 'paella' ], sections)
      } else if (value === `caesar salad` || value === `salad`) {
        item = path([ 'HotelItems', 'in_room_dining', 'caesar_salad' ], sections)
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

      console.log('Item code = ' , item.code)
      console.log('Item name = ' , item.name)

      const payload1 = {
                          categoryItems: [
                            {
                              itemCode: item.code,
                              quantity: 1,
                            }
                          ],
                          checkout: {
                            deliveryDateTime: new Date().toISOString(),
                            isDeliveryDateTimeUtc: true,
                          },
                          justValidateDeliveryTime: false
                        }
      console.log('payload1 = ' , payload1)
      
      const pathName = formatPath(item.code, getItem.path)
      const res1 = await get1(pathName, payload)
      const price =  res1.responses[0][getItem.key].content.price
      console.log('price = ' , price)

      const res2 = await post(checkout.path, payload)
      const textPrompt = `You have selected ${value}; this would be ${price} dollars; your order will be with you shortly.`
      console.log('textPrompt = ' , textPrompt)
      
      return {
          text: textPrompt ,
          options: { shouldEndSession: true },
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
