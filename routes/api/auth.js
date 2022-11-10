const express = require("express")

const router = express.Router();
const { authenticate, upload } = require('../../middlewares')
const { ctrlWrapper } = require('../../helpers')

const ctrl = require('../../controllers/auth')

router.post('/register', ctrlWrapper(ctrl.register));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));
router.post('/verify', ctrlWrapper(ctrl.resendEmail));
router.post('/login', ctrlWrapper(ctrl.login));
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));
router.patch('/', authenticate, ctrlWrapper(ctrl.subscriptionUpdate));
router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;