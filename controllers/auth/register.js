const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User, schemas } = require('../../models/user')

const { RequestError, sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

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
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({ password: hashPassword, email, avatarURL, verificationToken });

    const mail = {
        to: email,
        subject: "Verification email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
    }

    await sendEmail(mail);

    res.status(201).json({
        email: result.email,
    })
}

module.exports = register;