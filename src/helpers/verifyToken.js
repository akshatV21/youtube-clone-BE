const { verify } = require("jsonwebtoken")

const getUserIdFromToken = token => {
  return verify(token, process.env.JWT_SECRET, (err, id) => {
    if (err) throw new Error(err)
    return id
  })
}

module.exports = getUserIdFromToken
