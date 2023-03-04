const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    image: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
  },
);

const About = mongoose.model("about", aboutSchema);
module.exports = About;