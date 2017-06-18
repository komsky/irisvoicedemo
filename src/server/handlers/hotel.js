import api from '../api'
import { getItem } from '../../../data/GXPRoutes'
import voice_sections from '../../../data/voice_sections'
import { formatPath } from '../../utils'
import { path } from 'ramda'
const get = api(getItem.method)

const hotel = path([ 'Heddon', 'categories', 'rewards'], voice_sections)
const pathName = formatPath(hotel.code, getItem.path)

const getHotelInformation = async (payload) => {
  const res = await get(pathName, payload)
  // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
  return {
    text: res.responses[0][getItem.key].content.longDescription,
    options: { shouldEndSession: true },
    session: res.session
  }
}
export default getHotelInformation