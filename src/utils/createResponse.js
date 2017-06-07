import { isEmpty } from 'ramda'


const createResponse = payload => {
  if (isEmpty(payload)) return
  const { text, options, session, directives, reprompt } = payload

  const speech = text ? { outputSpeech: { type: 'PlainText', text } } : {}
  const rePrompt = reprompt ? { reprompt: { outputSpeech: { type: 'PlainText', text: reprompt } } } : {}
  const dir = directives ? { directives } : {}

  return {
    response: {
      ...speech,
      ...rePrompt,
      ...options,
      ...dir
    },
    sessionAttributes: { session }
  }
}

export default createResponse
