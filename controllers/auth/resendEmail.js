const { User, schemas } = require('../../models/user');
const { RequestError, sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
    const { email } = req.body;

    const { error } = schemas.verifyEmailSchema.validate({ email });
    if (error) {
        throw RequestError(400, error.message);
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(404)
    }
    if (user.verify) {
        throw RequestError(400, "Verification has already been passed");
    }
    const mail = {
        to: email,
        subject: "Verification email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`,
    }
    await sendEmail(mail);

    res.json({
        message: 'Verification email sent'
    })
}
module.exports = resendEmail;