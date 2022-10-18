const bcrypt = require("bcrypt");

const { User, schemas } = require('../../models/user')

const { RequestError } = require('../../helpers');

const register = async (req, res) => {
    const { error } = schemas.registerSchema.validate(req.body);
    if (error) {
        throw RequestError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, 'User with this email is alredy registered')
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ password: hashPassword, email });
    res.status(201).json({
        email: result.email,
    })
}

module.exports = register;