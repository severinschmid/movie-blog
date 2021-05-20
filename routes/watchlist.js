const config = require('../config')
const list = require('../watchlist.json')
const fs = require('fs');
const navigation = config.navigation

console.log(list)

async function watchlistHandler(req, res, next) {
    return res.render('main', {
      layout: 'index',
      list,
      navigation,
      type: "watchlist"
    })
  }


module.exports = watchlistHandler;
