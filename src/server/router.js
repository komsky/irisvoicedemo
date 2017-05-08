import * as handlers from './handlers'
import createResponse from '../utils'

const router = (payload) => {
  const { request: { intent: { name } } } = payload
  return createResponse(handlers[name](payload))
}

export default router
