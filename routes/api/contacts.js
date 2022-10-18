const express = require('express');

const ctrl = require('../../controllers/contacts')

const { authenticate } = require('../../middlewares')

const { ctrlWrapper } = require('../../helpers')

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, ctrl.getById)

router.post('/', authenticate, ctrlWrapper(ctrl.add))

router.delete('/:contactId', authenticate, ctrlWrapper(ctrl.remove))

router.put('/:contactId', authenticate, ctrlWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', authenticate, ctrlWrapper(ctrl.updateFavorite))

module.exports = router
