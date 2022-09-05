const { Router } = require("express")
const { httpRegisterUser, httpLoginUser } = require("../controllers/auth-controller")
const { validateRegisterRequest, validateLoginRequest } = require("../middlewares/auth-middlewares")

const authRouter = Router()

authRouter.post("/register", validateRegisterRequest, httpRegisterUser)
authRouter.post("/login", validateLoginRequest, httpLoginUser)

module.exports = authRouter
