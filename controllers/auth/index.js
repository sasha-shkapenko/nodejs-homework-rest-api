const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const subscriptionUpdate = require('./subscriptionUpdate');

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    subscriptionUpdate,
}