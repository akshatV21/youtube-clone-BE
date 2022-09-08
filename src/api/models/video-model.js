const { Schema, Types, model } = require("mongoose")

const videoSchema = new Schema({
  channelId: { type: Types.ObjectId, required: true, ref: "channel" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: { type: [Types.ObjectId], default: [], ref: "comment" },
  views: { type: Number, default: 0 },
  increasedSubCount: { type: Number, default: 0 },
  private: { type: Boolean, required: true },
  thumbnail: { type: String, required: true },
  category: { type: [String], required: true },
})

const VideoModel = model("video", videoSchema)

module.exports = VideoModel
