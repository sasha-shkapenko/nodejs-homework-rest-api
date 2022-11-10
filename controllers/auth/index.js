const register = require('./register');
const verify = require('./verify');
const resendEmail = require('./resendEmail');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const subscriptionUpdate = require('./subscriptionUpdate');
const updateAvatar = require('./updateAvatar');

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    subscriptionUpdate,
    updateAvatar,
    verify,
    resendEmail
}