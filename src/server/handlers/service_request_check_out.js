import api from '../api'
import { addServiceRequest } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { formatPath, buildServiceRequest, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
const put = api(addServiceRequest.method)

const service_request = path([ 'HotelItems', 'service_requests', 'check_out' ], sections)

const doRequestCheckOut = async (payload) => {

    const { intent: { slots: { confirmationSlot: {value} }, confirmationStatus }, dialogState } = payload.request
    
    if (value !== null) {

      if (value === 'yes' || value === 'confirmed' || value === 'confirm') {
          payload = {
            categoryItemCode: service_request.code,
            deliveryDateTime: new Date().toISOString(),
            isDeliveryDateTimeUtc: true
          }
          console.log('Payload data: ' , payload)

          //const res = await put(addServiceRequest.path, payload)
          const res = put(addServiceRequest.path, payload)
          //const orderId = res.responses[0][addServiceRequest.key].content.order.id
          //const returnText = `Your service request for ${service_request.name} was succesfully submitted; your request number is ${orderId}`
          const returnText = `Your service request for ${service_request.name} was succesfully submitted`
          
          console.log('returnText: ' , returnText)
          //console.log('res.sessionToken: ' , res.sessionToken)
          return {
            text: returnText,
            options: { shouldEndSession: true },
            session: res.session
          }
      } else if (value === 'no' || value === 'not' || value === 'nope') {
        
        return {
          text: service_request.rejectionMsg,
          options: { shouldEndSession: true }
        }
      }
    }
    
    return {
        directives: [
          {
            type: 'Dialog.ElicitSlot',
            slotToElicit: 'confirmationSlot'
          }
        ],
        text: service_request.confirmationMsg,
        reprompt: service_request.repromptMsg,
        options: { shouldEndSession: false },
        session: {}  
    }
}

export default doRequestCheckOut
