import api from '../api'
import { getItem, getCategoryItems, addServiceRequest } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { serviceRequestTimeOptionsModel } from '../../model'
import { formatPath, slotsFilled, slotFilled, buildServiceRequest, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
const get = api(getItem.method)
const put = api(addServiceRequest.method)

const item = path([ 'HotelItems', 'service_requests', 'check_out' ], sections)
const pathName = formatPath(item.id, getCategoryItems.path)
const itemCode = item.code

const submitServiceRequest = (slots, items) => {
  const payload = buildServiceRequest(serviceRequestTimeOptionsModel)(slots, items)
  put(sendServiceRequest.path, payload)
}

const doRequestCheckOut = async (payload) => {
    submitServiceRequest(slots, items)

  // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
  return {
    //text: res.responses[0][getItem.key].content.longDescription,
    text: 'Yay',
    options: { shouldEndSession: true },
    session: res.session
  }
}

export default doRequestCheckOut
