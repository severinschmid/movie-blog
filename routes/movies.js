const hbs = require('express-handlebars')
const config = require('../config')
const navigation = config.navigation
const movies = require('../movieList')
const fs = require('fs');

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

function log(req) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  var date = new Date();
  var current_hour = date.getHours() +2;
  var current_minute = date.getMinutes();
  var month = date.getUTCMonth() + 1; //months from 1-12
  var day = date.getUTCDate();

  if (req.session.page_views < 2) {
    fs.appendFile("sessions.log", `\n ${JSON.stringify({
      time: day + "/" +
        month + " - " + current_hour + ":" + current_minute, sessions: req.session.page_views
    })}`, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  }
}

async function moviesHandler(req, res, next) {
  var movieListToRender = initMovieList();
  if (req.session.page_views) {
    req.session.page_views++;
  } else {
    req.session.page_views = 1;
  }

  log(req)

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
