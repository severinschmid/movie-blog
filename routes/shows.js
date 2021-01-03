const hbs = require('express-handlebars')
const config = require('../config')
const navigation = config.navigation
const shows = require('../showsList')


function getMovieByPlatform(platforms) {
  let s = []
  shows.forEach(movie => {
    if (platforms.find(x => x.platform == movie.platform && x.isActive)) {
      s.push(movie)
    }
  })
  return s
}

let platforms = []

shows.forEach(movie => { // compile list of all platforms that exist and if they are currently selected by the user
  let alreadyInIt = platforms.find(x => x.platform == movie.platform)
  if (!alreadyInIt && movie.platform !="") platforms.push({ platform: movie.platform, isActive: true })
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
      shows: getMovieByPlatform(platforms),
      type: "shows"
    })
  } catch (err) {
    return next(err);
  }
}


module.exports = showsHandler;
