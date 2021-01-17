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


const initMovieList = () => {
  let s = []
  movies.forEach(movie => {
    s.push(movie)
  })
  return s
}

let platforms = []

movies.forEach(movie => { // compile list of all platforms that exist and if they are currently selected by the user
  let alreadyInIt = platforms.find(x => x.platform == movie.platform)
  if (typeof alreadyInIt !== undefined && !alreadyInIt) platforms.push({ platform: movie.platform, isActive: false })
})

async function moviesHandler(req, res, next) {
  var movieListToRender = initMovieList();

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
      movieListToRender = getMovieByPlatform(platforms)
    }

    return res.render('main', {
      layout: 'index',
      navigation,
      platforms,
      movies: movieListToRender,
      type: "movies"
    })
  } catch (err) {
    return next(err);
  }
}


module.exports = moviesHandler;
