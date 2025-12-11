import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginateV2 from "mongoose-aggregate-paginate-v2";

// Schema for storing video data
const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true, // main video URL/path
    },

    thumbnail: {
      type: String,
      required: true, // thumbnail image URL
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true, // video length in seconds
    },

    views: {
      type: Number,
      default: 0, // starts at zero when uploaded
    },

    isPublish: {
      type: Boolean,
      default: true, // controls visibility
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // who uploaded the video
    },
  },
  {
    timestamps: true,
  }
);

// Add aggregate pagination support
videoSchema.plugin(mongooseAggregatePaginateV2);

export const Video = mongoose.model("Video", videoSchema);
