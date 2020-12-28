const express = require('express')
const router = new express.Router()
const movies = require('./movies')
const shows = require('./shows')
const about = require('./about')

router.get('/', movies)
router.get('/shows', shows)
router.get('/about', about)


router.post('/', movies)
router.post('/shows', shows)

module.exports = router