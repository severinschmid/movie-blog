const express = require('express');
const app = express();
const routes = require('./routes')
const helmet = require('helmet');
const path = require('path')
const hbs = require('express-handlebars');
var session = require('express-session');

//hbs.registerHelper('getConfigValue', require('./helpers/input'));

const publicPath = path.join(__dirname, './views');
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "Shh, its a secret!" }));

// View
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  helpers: {
    switch: function (value, options) {
      this.switch_value = value;
      return options.fn(this);
    },
    case: function (value, options) {
      if (value == this.switch_value) {
        return options.fn(this);
      }
    } 
  },
  update: function (value) {
      
  }
}));


app.use(express.static('public'))
app.use(routes)

app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});

module.exports = app;