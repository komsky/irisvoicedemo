


const createResponse = payload => {
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
