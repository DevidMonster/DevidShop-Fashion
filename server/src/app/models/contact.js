const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      max: 10,
    },
    subject: {
        type: String,
        require: true,
        max: 100,
    },
    message: {
        type: String,
        require: true,
        max: 500,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;