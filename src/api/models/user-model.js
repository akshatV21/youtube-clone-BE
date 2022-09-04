const { Schema, Types } = require("mongoose")

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  settings: {
    playerSize: { type: String },
    volume: { type: Number },
  },
  interests: { type: [String] },
  watchLater: { type: [Types.ObjectId], default: [], ref: "videos" },
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
