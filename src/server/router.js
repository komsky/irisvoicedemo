import * as handlers from './handlers'
import createResponse from '../utils'
import responses from '../../data/harcodedResponse'

const router = (payload) => {
  const { request: { intent: { name } } } = payload

  if (process.env.STATIC) return responses[name]
  
  return createResponse(handlers[name](payload))
}

export default router
