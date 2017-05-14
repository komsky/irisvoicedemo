
const attachSession = (req, res, next) => {
  res.body = { ...res.body, sessionAttributes: res.body.session }
  delete res.body.jwt
  next()
}

export default attachSession
