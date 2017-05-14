
const attachSession = (req, res, next) => {
  res.body = { ...res.body, sessionAttributes: res.body.session }
  delete res.body.jwt
  res.end(JSON.stringify(res.body))
}

export default attachSession
