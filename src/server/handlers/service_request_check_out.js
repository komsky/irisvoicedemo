import api from '../api'
import { addServiceRequest } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { serviceRequestTimeOptionsModel } from '../../model'
import { formatPath, slotsFilled, slotFilled, buildServiceRequest, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
//const get = api(getItem.method)
const put = api(addServiceRequest.method)

const item = path([ 'HotelItems', 'service_requests', 'check_out' ], sections)
const payload = buildServiceRequest(item.code)
console.log(payload.toString)

const doRequestCheckOut = async (payload) => {
    
    put(addServiceRequest.path, payload)

  // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
  return {
    //text: res.responses[0][getItem.key].content.longDescription,
    text: 'Yay',
    options: { shouldEndSession: true },
    session: res.session
  }
}

export default doRequestCheckOut
