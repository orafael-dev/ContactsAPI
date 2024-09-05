module.exports = (error, request, response) => {
  console.log('###### ERROR HANDLER #####')
  console.log(error)
  response.sendStatus(500)
}