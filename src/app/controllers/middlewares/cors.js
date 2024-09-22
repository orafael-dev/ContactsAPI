module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
  response.setHeader('Access-Control-Allow-Methods', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  response.setHeader('Access-Control-Allow-Max-Age', '10')
  next()
}