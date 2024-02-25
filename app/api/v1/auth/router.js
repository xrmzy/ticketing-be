const express = require('express')
const router = express()
const { signCms } = require('./controller')

router.post('/auth/signin', signCms)

module.exports = router
