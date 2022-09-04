const handleError = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const errMessage = err.message || "Internal Server Error!!"

  console.error(err)
  res.status(statusCode).json({ success: false, message: errMessage })
}

module.exports = handleError
