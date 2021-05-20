const config = require('../config')

const navigation = config.navigation


async function aboutHandler(req, res, next) {
  try {
    return res.render('main', {
      layout: 'index',
      body: "Hello Home",
      navigation,
      type: "about"
    })
  } catch (err) {
    return next(err);
  }
}

module.exports = aboutHandler;