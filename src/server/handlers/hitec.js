import api from '../api'
import { getItem } from '../../../data/GXPRoutes'
import voice_sections from '../../../data/voice_sections'
import { formatPath } from '../../utils'
import { path } from 'ramda'
const get = api(getItem.method)

const hitec = path([ 'HotelItems', 'categories', 'hitec'], voice_sections)
const pathName = formatPath(hitec.code, getItem.path)

const getHiTecInformation = async (payload) => {
  const res = await get(pathName, payload)

  // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
  return {
    text: res.responses[0][getItem.key].content.longDescription,
    options: { shouldEndSession: true },
    session: res.session
  }
}
export default getHiTecInformation