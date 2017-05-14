
const attachSession = (req, res, next) => {
  res.body = { ...res.body, sessionAttributes: { jwt: res.body.jwt } }
  delete res.body.jwt
  res.end(JSON.stringify(res.body))
}

export default attachSession
