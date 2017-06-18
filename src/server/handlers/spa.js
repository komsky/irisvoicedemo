import api from '../api'
import { getItem } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { formatPath } from '../../utils'
import { path } from 'ramda'
const get = api(getItem.method)

const cat_spaitem = path([ 'HotelItems', 'information', 'spa'], sections)
const pathName = formatPath(spa.code, getItem.path)

const getSpaInformation = async (payload) => {
  const res = await get(pathName, payload)

  // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
  return {
    text: res.responses[0][getItem.key].content.longDescription,
    options: { shouldEndSession: true },
    session: res.session
  }
}

export default getSpaInformation