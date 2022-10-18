const { Contact, schemas } = require('../../models/contact');
const { RequestError } = require('../../helpers');

const add = async (req, res) => {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
        throw RequestError(400, error.message)
    }
    const { _id: owner } = req.user;
    const contact = await Contact.create({ ...req.body, owner });
    res.status(201).json(contact);
}

module.exports = add;