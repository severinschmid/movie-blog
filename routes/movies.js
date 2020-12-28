const hbs = require('express-handlebars')
const config = require('../config')
const navigation = config.navigation



const movies = [
  {
    name: "Nightcrawler",
    platform: "Netflix",
    description: "Another Jake Gyllenhaal favorite. It is pretty great, I think even one of my favorites. It´s dark but nothing you can´t handle. This was also the first time I noticed Riz Ahmed and since then I kind of follow his career, too. He is also in Una, The Sisters Brothers and Sound of Metal"
  },
  {
    name: "Burning",
    platform: "Amazon",
    description: "I guess this is the movie I think about the most, it is currently in my top three favorite movies. To be brief, I was just so immersed into this. The world feels so lived-in, the performances are great, and it is one of the best looking films I know. No other movie I know depicts poverty and class in South Korea like Burning."
  },
  {
    name: "Prisoners",
    platform: "Netflix",
    description: "My favorite movie for a long time. I guess when i first saw this, no other movie has been this thrilling. I was on the edge of my seat the entire time. My love for Denis Villeneuve really started with this one."
  }, {
    name: "Arrival",
    platform: "Amazon",
    description: "You have to see this because it is from Denis Villeneuve. One of the best science fiction movies because it seems so real. The score is absolutely beautiful. Sadly, the composer Johann Johannsson died in 2018."
  }
]

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
  if (!alreadyInIt) platforms.push({ platform: movie.platform, isActive: true })
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
