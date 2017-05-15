import { isEmpty } from 'ramda'


const createResponse = payload => {
  if (isEmpty(payload)) return
  const { text, options, session, directives } = payload

  const speech = text ? { outputSpeech: { type: 'PlainText', text } } : {}
  const dir = directives ? { directives } : {}

  return {
    response: {
      ...speech,
      ...options,
      ...dir
    },
    sessionAttributes: { session }
  }
}

export default createResponse
