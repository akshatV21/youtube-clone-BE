const { default: mongoose } = require("mongoose")

require("dotenv").config()

const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL)
  console.log("Connected to mongo database")
}

mongoose.connection.on("error", err => {
  console.log("Mongoose connection error: \n" + err)
})

module.exports = { connectToMongo }
