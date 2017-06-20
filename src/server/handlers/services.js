import api from '../api'
import { getCategoryItems, serviceRequest } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { foodModel } from '../../model'
import { formatPath, buildServiceRequest, lower } from '../../utils'
import { path, isEmpty } from 'ramda'
const get = api(getCategoryItems.method)
const put = api(serviceRequest.method)

const items = path([ 'HotelItems', 'service_requests' ], sections)
const pathName = formatPath(items.code, getCategoryItems.path)

const submitServiceRequest = (slots, items) => {
  const payload = buildServiceRequest(foodModel)(slots, items)
  put(serviceRequest.path, payload)
}

const buildServicesText = items => {
  const itemsText = items.map(x => x.name).join(',')
  return `We offer the following services, please select from the following ${itemsText}`
}

const getServicesInformation = async (payload) => {
  const { intent: { slots, confirmationStatus }, dialogState } = payload.request

  const res = await get(pathName, payload)
  const items = res.responses[0][getCategoryItems.key].content.categoryItems

  return {
    text: buildServicesText,
    options: { shouldEndSession: true },
    session: res.session
  }
}

export default getServicesInformation
