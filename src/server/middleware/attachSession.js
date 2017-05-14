
const attachSession = (req, res, next) => {
  res.body = { ...res.body, sessionAttributes: res.body.session }
  console.log('BODY AFTER ATTACH >>>>>>', res.body)
  next()
}

export default attachSession
