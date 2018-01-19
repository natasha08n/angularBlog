const express    = require('express');
const path       = require('path');
const logger     = require('morgan');

const session    = require('./http/controllers/session');
const users      = require('./http/controllers/user');
const tags       = require('./http/controllers/tag');
const posts      = require('./http/controllers/post');
const comments   = require('./http/controllers/comment');

const port       = process.env.PORT || 3000;
const app        = express();
const bodyParser = require('body-parser');
const cors       = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/session', session);
app.use('/users', users);
app.use('/tags', tags);
app.use('/posts', posts);
app.use('/comments', comments);

app.use(logger('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.all('*', (req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next(); // http://expressjs.com/guide.html#passing-route control
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: (app.get('env') === 'development') ? err : {}
//   });
// });

module.exports = app;