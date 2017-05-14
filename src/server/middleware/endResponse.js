
const endResponse = (req, res) => {
  res.end(JSON.stringify(res.body))
}

export default endResponse
