const { Schema, Types, model } = require("mongoose")

const videoSchema = new Schema({
  channelId: { type: Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  comments: { type: [Types.ObjectId], default: [], ref: "comments" },
  views: { type: Number, default: 0 },
  increasedSubCount: { type: Number, default: 0 },
  private: { type: Boolean, default: false },
  thumbnail: { type: String, required: true },
  category: { type: [String], required: true },
})

const VideoModel = model("video", videoSchema)

module.exports = VideoModel
