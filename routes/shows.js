const hbs = require('express-handlebars')
const config = require('../config')
const navigation = config.navigation
const shows = require('../showsList')


function getShowByPlatform(platforms) {
  let s = []
  shows.forEach(show => {
    if (platforms.find(x => x.platform == show.platform && x.isActive)) {
      s.push(show)
    }
  })
  return s
}

let platforms = []

shows.forEach(show => { // compile list of all platforms that exist and if they are currently selected by the user
  let alreadyInIt = platforms.find(x => x.platform == show.platform)
  if (!alreadyInIt && show.platform !="") platforms.push({ platform: show.platform, isActive: true })
})

async function showsHandler(req, res, next) {

  try {
    const excludedPlatform = req.body.platform;

    if (excludedPlatform) {
      if (platforms.find(x => x.isActive == true && x.platform == excludedPlatform)) {
        console.log(excludedPlatform)
        platforms.find(x => x.platform == excludedPlatform).isActive = false
      }
      else {
        platforms.find(x => x.platform == excludedPlatform).isActive = true
      }
    }

    return res.render('main', {
      layout: 'index',
      navigation,
      platforms,
      shows: getShowByPlatform(platforms),
      type: "shows"
    })
  } catch (err) {
    return next(err);
  }
}


module.exports = showsHandler;
