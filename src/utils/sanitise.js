import { compose } from 'ramda'
import { AllHtmlEntities } from 'html-entities'
const entities = new AllHtmlEntities()
import striptags from 'striptags'

const sanitise = text =>
  compose(entities.decode, striptags)(text)

export default sanitise
