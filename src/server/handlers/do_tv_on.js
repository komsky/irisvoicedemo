import api from '../api'
import { getItem } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { formatPath } from '../../utils'
import { path } from 'ramda'
const get = api(getItem.method)

const item = path([ 'HotelItems', 'categories', 'tv_on'], sections)
const pathName = formatPath(item.code, getItem.path)

const doTVOn = async (payload) => {

  // CHECK IF ALL SLOTS ARE FILLED
  // IF YES, SUBMIT, ELSE CARRY ON AS NORMAL
  if (dialogState === 'COMPLETED' && confirmationStatus === 'CONFIRMED') {
    
    const res = await get(pathName, payload)

    // MAKE ACCESS LESS BRITTLE -> No 0 PROP ACCESS
    return {
      text: res.responses[0][getItem.key].content.longDescription,
      options: { shouldEndSession: true },
      session: res.session
    }
  }

  
}
export default doTVOn