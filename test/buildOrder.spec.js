import { slots, items } from './mock'
import { foodModel } from '../src/model'
import { buildOrder } from '../src/utils'
import test from 'tape'

test('[ buildOrder() ] - can build the payload for an order', t => {
  console.log(JSON.stringify(buildOrder(foodModel)(slots, items)))

  t.end()
})
