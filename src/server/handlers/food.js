import api from '../api'
import { getItem, getCategoryItems } from '../../../data/GXPRoutes'
import sections from '../../../data/sections'
import { formatPath } from '../../utils'
import { path, pick } from 'ramda'
const get = api(getItem.method)

const mains = path([ 'foodAndDrink', 'categories', 'roomService', 'subCategories', 'mains' ], sections)
const pathName = formatPath(mains.id, getCategoryItems.path)

const buildText = (first, items) => {
  const itemsText = items.map(x => x.name).join(',')
  if (first) {
    return `We have some great things in on the in-room dining menu tonight. Here are three options, but let me know if you want to hear more. ${itemsText}`
  }
  return `OK, here's three more: ${itemsText}`
}

const getFoodInformation = async (payload) => {
  const { attributes, new: newSession } = payload.session
  const  { paging, options } = attributes.session || {}
  const { page = 0, size = 3 } = paging || {}

  let items;
  let res;
  // IF SESSION IS NEW, FETCH MAINS OPTIONS
  if (newSession && !options) {
    res = await get(pathName, payload)
    items = res.responses[0][getCategoryItems.key].content.categoryItems
  }

  if (options && !newSession) {
    items = options
  }

  const simpleItems = items.map(pick([ 'itemCode', 'name', 'longDescription', 'price', 'modifiers' ]))

  let text;
  if (page) {
    text = buildText(false, simpleItems.slice(page * size, (page * size) + size))
  } else {
    text = buildText(true, simpleItems.slice(0, size))
  }

  const originalSesssion = newSession ? res.session : payload.session.attributes
  const session = { ...originalSesssion, paging: { page: page + 1, size: 3 }, options: simpleItems }

  return {
    text,
    session,
    options: { shouldEndSession: false }
  }
}

export default getFoodInformation
