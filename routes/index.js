const express = require('express')
const router = new express.Router()
const movies = require('./movies')
const shows = require('./shows')
const about = require('./about')
const sitemap = require('./sitemap')

router.get('/', movies)
router.get('/shows', shows)
router.get('/about', about)
router.get('/sitemap', sitemap)


router.post('/', movies)
router.post('/shows', shows)

module.exports = router