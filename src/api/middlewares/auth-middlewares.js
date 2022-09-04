const CONTENTS = require("../../contents/contents")

const validateRegisterRequest = async (req, res, next) => {
  const { username, email, password } = req.body
  if (!username) return res.status(400).json({ success: false, message: CONTENTS.NULL_USERNAME })
  if (!email) return res.status(400).json({ success: false, message: CONTENTS.NULL_EMAIL })
  if (!password) return res.status(400).json({ success: false, message: CONTENTS.NULL_PASSWORD })

  req.user = { username, email, password }
  next()
}

const validateLoginRequest = async (req, res, next) => {
  const { input, password } = req.body
  if (!input) return res.status(400).json({ success: false, message: CONTENTS.NULL_INPUT })
  if (!password) return res.status(400).json({ success: false, message: CONTENTS.NULL_PASSWORD })

  req.user = { input, password }
  next()
}

module.exports = { validateRegisterRequest, validateLoginRequest }
