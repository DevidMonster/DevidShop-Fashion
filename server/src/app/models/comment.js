const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    product_id: {
        type: String,
        required: true,
    },
    name: {
      type: String,
      required: true,
      max: 100,
    },
    email: {
        type: String,
        require: true,
        max: 100,
    },
    content: {
        type: String,
        require: true,
        min: 1
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;