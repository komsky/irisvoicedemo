import * as handlers from './handlers'
import { createResponse } from '../utils'
import responses from '../../data/harcodedResponse'

const router = async (payload) => {
  const { request: { intent: { name } } } = payload

  if (process.env.STATIC) return responses[name]

  const res = await handlers[name](payload)
  return createResponse(res)

}

export default router
