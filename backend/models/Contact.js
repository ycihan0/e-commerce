const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactSchema = mongoose.Schema(
  {
    messages: [MessageSchema],
    googleSrc: { type: String, required: true },
    adress: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
