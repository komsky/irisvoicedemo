
import { pluck, omit } from 'ramda'
import lower from './lower'

const buildInRoomDiningOrder = model => (itemCode) => {

  return {
    categoryItems: [
      {
        itemCode: itemCode,
        quantity: 1,
      }
    ],
    checkout: {
      deliveryDateTime: new Date().toISOString(),
      isDeliveryDateTimeUtc: true,
    },
    justValidateDeliveryTime: false
  }
}

export default buildInRoomDiningOrder
