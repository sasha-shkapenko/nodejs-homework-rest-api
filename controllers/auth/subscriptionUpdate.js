const { RequestError } = require('../../helpers');
const { User, schemas } = require('../../models/user')

const subscriptionUpdate = async (req, res) => {
    const { error } = schemas.updSubscriptionSchema.validate(req.body);
    if (error) {
        throw RequestError(400, error.message)
    }
    const { _id } = req.params;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json(result);
}
module.exports = subscriptionUpdate;