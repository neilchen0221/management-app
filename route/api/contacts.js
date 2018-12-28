const express = require('express');
const router = express.Router();

//Contact Model
const Contact = require('../../models/Contact');

// @route  GET api/contacts
// @desc   Get All Contacts
// @access Public
router.get('/', (req, res) => {
  Contact.find()
    .sort({ firstName: 1 })
    .then(contacts => res.json(contacts));
});

// @route  POST api/contacts
// @desc   Create A Post
// @access Public
router.post('/', (req, res) => {
  const newContact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email
  });
  newContact.save().then(contact => res.json(contact));
});

// @route  DELETE api/contacts/:id
// @desc   Delete A Contact
// @access Public
router.delete('/:id', (req, res) => {
  Contact.findById(req.params.id)
    .then(contact => contact.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
