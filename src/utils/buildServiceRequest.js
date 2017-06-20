import { pluck, omit } from 'ramda'
import { steak } from '../../data/sections'
import lower from './lower'


const buildServiceRequest = model => (slots, items, itemCode) => {

  return {
    requestModel: {
      categoryItemCode: itemCode,
      deliveryDateTime: new Date().toISOString(),
      isDeliveryDateTimeUtc: true,
    },
    justValidateDeliveryTime: false
  }
}

export default buildServiceRequest
