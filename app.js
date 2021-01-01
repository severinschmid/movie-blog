const express = require('express');
const app = express();
const routes = require('./routes')
const helmet = require('helmet');
const path = require('path')
let hbs = require('express-handlebars');

const publicPath = path.join(__dirname, './views');
console.log(publicPath)
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
// View
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  defaultLayout: __dirname + '/views/layouts',
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
  }
}));

app.use(express.static('public'))
app.use(routes)

module.exports = app;
