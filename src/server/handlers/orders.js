import api from '../api'
import { getOrders } from '../../../data/GXPRoutes'
import { last } from 'ramda'
const get = api(getOrders.method)

const getOrdersInformation = async (payload) => {
  const res = await get(getOrders.path, payload)

  const orders = res.responses[0][getOrders.key].content.orders
  const latest = last(orders)

  return {
    text: `I have checked your latest order and it is currently ${latest.status}`,
    options: { shouldEndSession: true },
    session: res.session
  }
}

export default getOrdersInformation
