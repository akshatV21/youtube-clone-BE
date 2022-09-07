const { Schema, Types, model } = require("mongoose")

const playlistSchema = new Schema({
  ownerId: { type: Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  videos: { type: [Types.ObjectId], default: [], ref: "video" },
  private: { type: Boolean, required: true },
})

const PlaylistModel = model("playlist", playlistSchema)

module.exports = PlaylistModel
