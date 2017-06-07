import { isEmpty } from 'ramda'


const createResponse = payload => {
  if (isEmpty(payload)) return
  const { text, options, session, directives, reprompt } = payload

  const speech = text ? { outputSpeech: { type: 'PlainText', text } } : {}
  const rePrompt = reprompt ? { outputSpeech: { type: 'PlainText', text: reprompt } } : {}
  const dir = directives ? { directives } : {}

  return {
    response: {
      ...speech,
      reprompt: rePrompt,
      ...options,
      ...dir
    },
    sessionAttributes: { session }
  }
}

export default createResponse
