const { compareSync, hashSync } = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { Schema, Types, model } = require("mongoose")

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  settings: {
    playerSize: { type: String, default: "small" },
    volume: { type: Number, default: 40 },
    trackHistory: { type: Boolean, default: true },
  },
  interests: { type: [String] },
  watchLater: { type: [Types.ObjectId], default: [], ref: "videos" },
  history: { type: [Types.ObjectId], default: [], ref: "videos" },
  playlists: {
    type: [
      {
        playlistName: String,
        vidoes: [Types.ObjectId],
        currentlyOn: {
          videoIndex: { type: Number },
          timestamp: { type: Number },
        },
      },
    ],
    default: [],
    ref: "videos",
  },
  isCreator: { type: Boolean, default: false },
  channel: { type: Types.ObjectId, ref: "channels" },
})

// events
userSchema.pre("save", function () {
  if (!this.isModified("password")) return

  const hashedPassword = hashSync(this.password, 4)
  this.password = hashedPassword
})

//statics
userSchema.statics.findByInput = async function (input) {
  const userByUsername = await this.findOne({ username: input })
  if (userByUsername) return userByUsername

  const userByEmail = await this.findOne({ email: input })
  if (userByEmail) return userByEmail
  console.log(userByEmail, input)
  return null
}

// methods
userSchema.methods.passwordMatches = function (password) {
  return compareSync(password, this.password)
}

userSchema.methods.generateToken = function () {
  const token = sign(this._id.toString(), process.env.JWT_SECRET)
  return token
}

const UserModel = model("user", userSchema)

module.exports = UserModel
