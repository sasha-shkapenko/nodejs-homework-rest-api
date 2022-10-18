const express = require("express")

const router = express.Router();
const { authenticate } = require('../../middlewares')
const { ctrlWrapper } = require('../../helpers')

const ctrl = require('../../controllers/auth')

router.post('/register', ctrlWrapper(ctrl.register));
router.post('/login', ctrlWrapper(ctrl.login));
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));
router.patch('/', authenticate, ctrlWrapper(ctrl.subscriptionUpdate));

module.exports = router;