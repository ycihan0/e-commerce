const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact.js");

//create a new contact
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//bring all contacts (Read-All)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

//bring one Contact (Read-Sigle by contact ID)
router.get("/:contactId", async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//bring one Contact (Read-Sigle by contact code)
router.get("/code/:contactCode", async (req, res) => {
  try {
    const contactCode = req.params.contactCode;
    const contact = await Contact.findOne({ code: contactCode });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    const { discountPercent } = contact;
    res.status(200).json({ discountPercent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//contact update
router.put("/:contactId", async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const updates = req.body;
    const existingContact = await Contact.findById(contactId);
    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    //If you can't find Id, return error;

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updates,
      { new: true } //send updated value
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error: Server error." });
  }
});

//contact delete
router.delete("/:contactId", async (req, res) => {
  try {
    const contactId = req.params.contactId;

    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.status(200).json(deletedContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
