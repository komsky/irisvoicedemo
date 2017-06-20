import api from '../api'
import { addServiceRequest } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { formatPath, buildServiceRequest, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
const put = api(addServiceRequest.method)

const request = path([ 'HotelItems', 'service_requests', 'check_out' ], sections)

const doRequestCheckOut = async (payload) => {

    payload = {
        categoryItemCode: request.code,
        deliveryDateTime: new Date().toISOString(),
        isDeliveryDateTimeUtc: true,
    }

    console.log('payload 111' , payload)

    const res = await put(addServiceRequest.path, payload)
    const orderId = res.responses[0][addServiceRequest.key].content.order.id
    const returnText = `Your service request for for ${request.name} was succesfully submitted; your request number is ${orderId}`
    
    console.log('returnText ' , returnText)
  return {
    text: returnText,
    options: { shouldEndSession: true },
    session: res.session
  }
}

export default doRequestCheckOut
