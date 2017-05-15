


const createResponse = payload => {
  const { text, options, session } = payload
  return {
    response: {
      outputSpeech: {
        type: 'PlainText',
        text
      },
      ...options,
    },
    sessionAttributes: { session }
  }
}

export default createResponse
