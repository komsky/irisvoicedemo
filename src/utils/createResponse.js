


const createResponse = (payload) => {
  const { text, options } = payload
  return {
    response: {
      outputSpeech: {
        type: "PlainText",
        text
      },
      ...options
    }
  }
}

export default createResponse
