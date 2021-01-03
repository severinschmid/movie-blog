const hbs = require('express-handlebars')
const config = require('../config')
const navigation = config.navigation
const movies = require('../movieList')

function getMovieByPlatform(platforms) {
  let movs = []
  movies.forEach(movie => {
    if (platforms.find(x => x.platform == movie.platform && x.isActive)) {
      movs.push(movie)
    }
  })
  return movs
}

let platforms = []

movies.forEach(movie => { // compile list of all platforms that exist and if they are currently selected by the user
  let alreadyInIt = platforms.find(x => x.platform == movie.platform)
  if (typeof alreadyInIt !== undefined && !alreadyInIt) platforms.push({ platform: movie.platform, isActive: true })
})

async function moviesHandler(req, res, next) {
  
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
      movies: getMovieByPlatform(platforms),
      type: "movies"
    })
  } catch (err) {
    return next(err);
  }
}


module.exports = moviesHandler;
