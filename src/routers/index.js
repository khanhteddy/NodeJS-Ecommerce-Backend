'use strict'

const express = require('express')
const { model } = require('mongoose')
const router = express.Router()


router.use('/api/v1', require('./access'))

module.exports = router