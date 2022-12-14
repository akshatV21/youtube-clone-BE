const { Schema, Types, model } = require("mongoose")

const channelSchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  name: { type: String, required: true },
  subscribers: { type: [Types.ObjectId], default: [], ref: "user" },
  totalViews: { type: Number, default: 0 },
  totalLikes: { type: Number, default: 0 },
  videos: { type: [Types.ObjectId], default: [], ref: "video" },
  playlists: { type: [Types.ObjectId], default: [], ref: "playlist" },
})

const ChannelModel = model("channel", channelSchema)

module.exports = ChannelModel
