import api from '../api'
import { getItem } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { formatPath } from '../../utils'
import { path } from 'ramda'
const get = api(getItem.method)

const history = path([ 'Heddon', 'categories', 'history'], sections)
const pathName = formatPath(history.code, getItem.path)

const getHistoryInformation = async (payload) => {
  const res = await get(pathName, payload)

  // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
  return {
    text: res.responses[0][getItem.key].content.longDescription,
    options: { shouldEndSession: true },
    session: res.session
  }
}
export default getHistoryInformation