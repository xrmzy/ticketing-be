const express = require('express')
const { index, update, destroy, find, create } = require('./controller')
const router = express()

router.get('talents', index)
router.get('talents/:id', find)
router.put('talents/:id', update)
router.delete('/talents/:id', destroy)
router.post('talents', create)

module.exports = router
