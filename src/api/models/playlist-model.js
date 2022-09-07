const { Schema, Types, model } = require("mongoose")

const playlistSchema = new Schema({
  name: { type: "string", required: true },
  description: { type: "string", required: true },
  videos: { type: Types.ObjectId, default: [] },
})

const PlaylistModel = model("playlist", playlistSchema)

module.exports = PlaylistModel
