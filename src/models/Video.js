import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
}); //Date.now()가 아니라 Date.now 인점을 주의할 것! Date.now()하면 schema가 정의되는 순간 실행됨

const Video = mongoose.model("Video", videoSchema);
export default Video;
