const FaunaService = require('@brianmmdev/faunaservice')

exports.handler = async (event, context) => {
  const service = new FaunaService("fnAEHWwaWcACA2OL-nIqxJ2awi5Lp9uivhbmvFdE")

  let task = JSON.parse(event.body)
  
  let user = context.clientContext.user
  task.userId = user.sub

  let created = await service.createRecord("Tasks", task)

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(created)
  }
}