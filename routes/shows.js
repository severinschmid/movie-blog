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

const initShowList = () => {
  let s = []
  shows.forEach(show => {
    s.push(show)
  })
  return s
}

let platforms = []

shows.forEach(show => { // compile list of all platforms that exist and if they are currently selected by the user
  let alreadyInIt = platforms.find(x => x.platform == show.platform)
  if (!alreadyInIt && show.platform != "") platforms.push({ platform: show.platform, isActive: false })
})

async function showsHandler(req, res, next) {
  var showListToRender = initShowList();
  
  try {
    const excludedPlatform = req.body.platform;

    if (excludedPlatform) {
      if (platforms.find(x => x.isActive == true && x.platform == excludedPlatform)) {
        platforms.find(x => x.platform == excludedPlatform).isActive = false
      }
      else {
        platforms.find(x => x.platform == excludedPlatform).isActive = true
      }
      showListToRender = getShowByPlatform(platforms)
    }

    return res.render('main', {
      layout: 'index',
      navigation,
      platforms,
      shows: showListToRender,
      type: "shows"
    })
  } catch (err) {
    return next(err);
  }
}


module.exports = showsHandler;
