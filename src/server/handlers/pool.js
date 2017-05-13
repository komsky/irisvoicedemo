import api from '../api'
import { getItem } from '../../../data/GXPRoutes'
import sections from '../../data/sections'
import { formatPath, sanitise } from '../../utils'
import { path } from 'ramda'
const get = api(getItem.method)

const pool = path(['information', 'categories', 'facilites', 'categoryItems', 'pool'], sections)
const path = formatPath(pool.id, getItem.path)

const getPoolInformation = async (payload) => {
  const res = await get(path, payload)

  // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
  const text = sanitise(res.responses[0][getItem.key].content.longDescription)

  return {
    text,
    options: { shouldEndSession: true }
  }
}

export default getPoolInformation
