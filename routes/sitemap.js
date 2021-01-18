const { create } = require('express-handlebars');
const hbs = require('express-handlebars')
const config = require('../config')
const navigation = config.navigation

const createSitemap = require('../lib/createSitemap');

async function sitemapHandler(req, res, next) {

  try {
    let urls = []
    config.navigation.forEach(element => {
      urls.push(element.uri)
    })
    const sitemap = await createSitemap(urls)
    const xml = sitemap.toString()

    res.type('application/xml')
    return res.send(xml)
  } catch (err) {
    return next(err);
  }
}


module.exports = sitemapHandler;
