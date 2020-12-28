const hbs = require('express-handlebars')
const config = require('../config')
const navigation = config.navigation



const shows = [
  {
    name: "Queens Gambit",
    platform: "Netflix",
    description: "It is just nice to watch."
  },
  {
    name: "Ozark",
    platform: "Netflix",
    description: "At first I thought this is just like Breaking Bad. It kind of is but it is very intense, well acted and overall very entertaining. Also, Julia Garner is in it."
  },
  {
    name: "Breaking Bad",
    platform: "Netflix",
    description: "One of my all-time favorites and a must-watch."
  },
  {
    name: "Better Call Saul",
    platform: "Netflix",
    description: "I started watching this after 3 seasons or so have been released. I was skeptical because it is a spin-off, but it works on its own extremely well. I could go on about this, but this is one of those where I could not believe how entertaining it is to watch. Like Barry."
  },
  {
    name: "Barry",
    platform: "Sky\xa0Ticket",
    description: "This is just perfect television. Shorter episodes, funny, exciting, and with Bill Hader. No other show combines different tones like Barry does. One of my current favorites."
  },
  {
    name: "Devs",
    platform: "Sky\xa0Ticket",
    description: "From one of my favorite film makers, Alex Garland. So far he made on hit after the other as a director. His two movies are Ex Machina and Annihilation. This is a limited series and very engaging. It is science fiction but I still would recommend this to everyone."
  },
  {
    name: "Catastrophe",
    platform: "Amazon",
    description: "An english series to shake things up a bit. I guess comedy is subjecitve but I find this pretty funny. The depicted releationship is unlike many others on TV, and the two protagonists wrote and created the show."
  },
]

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
