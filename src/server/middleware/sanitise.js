import { compose } from 'ramda'
import { AllHtmlEntities } from 'html-entities'
const entities = new AllHtmlEntities()
import striptags from 'striptags'

const sanitiseHTML = text =>
  compose(entities.decode, striptags)(text)

const sanitiseAmpersand = text =>
  text.replace(/&/g, 'and')

const sanitise = (req, res, next) => {
  const text = res.body.response.outputSpeech.text
  const sanitate = compose(
    sanitiseAmpersand,
    sanitiseHTML
  )
  res.body.response.outputSpeech.text = sanitate(text)
  next()
}

export default sanitise
