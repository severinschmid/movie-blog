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
    name: "Super Dark Times",
    platform: "Netflix",
    description: "Pretty intense thriller. It is so low key, but it is riveting and sometimes infuriating. I remember it to look awesome, too."
  },
  {
    name: "Marriage Story",
    platform: "Netflix",
    description: "You should know this one by now. It starrs Adam Driver so of course it is going to appear here. Noah Baumbach made movies in the past that made me think of him as pretentious, but not this one. It is very good."
  },
  {
    name: "I am thinking of ending things",
    platform: "Netflix",
    description: "A weird one which is kind of hard to recommend. But if you feel that you have seen everything, go see this. I think I have to see this more times to completely get it, or get it at all."
  },
  {
    name: "It comes at night",
    platform: "Netflix",
    description: "I can´t keep saying that movies are thrilling. I love A24, and the majority of movies they put out, this one included. The atmosphere is this is extremely well done, and the posters were amazing, too. The trailer makes it seem more like a horror movie than it acutally is, so give it chance."
  },
  {
    name: "Burning",
    platform: "Amazon",
    description: "I guess this is the movie I think about the most, it is currently in my top three favorite movies. To be brief, I was just so immersed into this. The world feels so lived-in, the performances are great, and it is one of the best looking films I have ever seen. No other movie I know depicts poverty and class in South Korea like Burning. Some day I am going to make all my friends watch it."
  },
  {
    name: "Prisoners",
    platform: "Netflix",
    description: "My favorite movie for a long time. I guess when i first saw this, no other movie has been this thrilling. I was on the edge of my seat the entire time. My love for Denis Villeneuve really started with this one."
  },
  {
    name: "Arrival",
    platform: "Amazon",
    description: "You have to see this because it is from Denis Villeneuve. One of the best science fiction movies because it seems so real. The score is absolutely beautiful. Sadly, the composer Johann Johannsson died in 2018."
  },
  {
    name: "American Factory",
    platform: "Netflix",
    description: "Produced by the Obamas, this documentary won the academy award. Maybe you think you don´t care about the subject matter but you will still enjoy this."
  },
  {
    name: "Okja",
    platform: "Netflix",
    description: "You should see any movie by Bong Joon-Ho that you can find. Please still watch them in the original with subtitles. This one is on Netflix and large part of it are in engish so it is the perfect gateway."
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
