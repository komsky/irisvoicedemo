import { pluck, omit } from 'ramda'
import lower from './lower'


const buildServiceRequest = model => (itemCode) => {

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
