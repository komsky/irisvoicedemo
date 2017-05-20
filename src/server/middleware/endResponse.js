
const endResponse = (req, res) => {
  console.log('RESPONSE BODY >>>>>>', res.body)
  res.end(JSON.stringify(res.body))
}

export default endResponse
