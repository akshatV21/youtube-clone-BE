const app = require("./app")
const { connectToMongo } = require("./mongo")

const PORT = process.env.PORT || 8080

const startServer = async () => {
  await connectToMongo()
  app.listen(PORT, () => console.log(`Listening to request on port: ${PORT}`))
}

startServer()
