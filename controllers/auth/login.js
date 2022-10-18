const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const { User, schemas } = require('../../models/user')

const { RequestError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { error } = schemas.loginSchema.validate(req.body);
    if (error) {
        throw RequestError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(401, "Email or password is incorrect")
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw RequestError(401, "Email or password is incorrect")
    }
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token })
    res.json({
        token,
    })
}
module.exports = login;