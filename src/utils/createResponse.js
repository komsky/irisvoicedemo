


const createResponse = (payload) => {
  const { text, directives } = payload
  return {
    response: {
      outputSpeech: {
        type: "PlainText",
        text
      },
      ...directives
    }
  }
}

export default createResponse
