const hbs = require('express-handlebars')
const config = require('../config')
const navigation = config.navigation



const movies = [
  {
    name: "I am thinking of ending things",
    platform: "Netflix",
    description: "A weird one which is kind of hard to recommend. But if you feel that you have seen everything, go see this. I think I have to see this more times to completely get it, or to get it at all."
  },
  {
    name: "Nightcrawler",
    platform: "Netflix",
    description: "Another Jake Gyllenhaal favorite. It is pretty great, I think even one of my favorites. It´s dark but nothing you can´t handle. This was also the first time I noticed Riz Ahmed and since then I kind of follow his career, too. He is also in Una, The Sisters Brothers and Sound of Metal"
  },
  {
    name: "The forty-year-old version",
    platform: "Netflix",
    description: "Written and directed by Radha Blank, who also plays the main role, this is about a drama teacher who decides to become a rapper. It is funny and heartfelt and looks great."
  },
  {
    name: "Incendies",
    platform: "Mubi",
    description: "The first major movie by Denis Villeneuve and the last one of him I have seen. It is mostly in french, and it is pretty grim. But it is exactly what you would expect from the director."
  },
  {
    name: "Knives Out",
    platform: "Amazon",
    description: "Who would have thought Rian Johnson would get to make another movie after The Last Jedi. This is it, and it is a fun little Whodunit with a great cast."
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
    name: "It comes at night",
    platform: "Netflix",
    description: "I can´t keep saying that movies are thrilling. I love A24, and the majority of movies they put out, this one included. The atmosphere is this is extremely well done, and the posters were amazing, too. The trailer makes it seem more like a horror movie than it acutally is, so give it chance."
  },
  {
    name: "The Sisters Brothers",
    platform: "Amazon",
    description: "Even though I rarley see Westerns, I very much enjoyed this. Starring Joaquin Phoenix, Jake Gyllenhaal, John C. Riley and Riz Ahmed."
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
    description: "Produced by the Obamas, this documentary won the academy award. Maybe you think you do not care about the subject matter, but I think you will still enjoy this."
  },
  {
    name: "Okja",
    platform: "Netflix",
    description: "You should see any movie by Bong Joon-Ho that you can find. Please still watch them in the original with subtitles. This one is on Netflix and large parts of it are in english so it is the perfect gateway."
  },
  {
    name: "Uncut Gems",
    platform: "Netflix",
    description: "Extremely anxiety inducing but also entertaining and one of the most talked about movies of 2019. This is not an Adam Sandler movie. If you enjoy it, you can also watch Good Times on Amazon, by the same directors and starring Robert Pattinson."
  },
  {
    name: "Annihilation",
    platform: "Netflix",
    description: "By one of my favorite directors, Alex Garland. He also made the limited Series Devs. Annihilation is his second film as a writer/director and I was so hyped for it after seeing Ex Machina. It definetely deliverers. Maybe too scary for some, and too boring for others, but if you like science fiction, or good movies in general, you have to see this."
  },
  {
    name: "Ex Machina",
    platform: "Amazon",
    description: "Sometimes this is not free on Amazon so you might have to spend 99 cents or something, but still. One of my favorite movies, and the directoral debut of Alex Garland, which is crazy to me."
  },
  {
    name: "Soul",
    platform: "Disney\xa0+",
    description: "I did not have high expectations, but the Director Pete Docter also made Up and Inside Out, two Pixar movies I enjoyed. This one is fantastic, I was genuinely sad it did not come out in theaters. It made me pretty emotional and I cannot recommend it enough."
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
