const express = require('express');
const path = require('path');

<<<<<<< HEAD
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpackconfig/webpack.dev.config')

=======
>>>>>>> master
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

<<<<<<< HEAD
const DIST_DIR = path.join(__dirname, 'dist')
const compiler = webpack(config)
=======
const DIST_DIR = path.join(__dirname, 'public')
>>>>>>> master

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

<<<<<<< HEAD
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}))
app.use(webpackHotMiddleware(compiler))
=======

>>>>>>> master

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
<<<<<<< HEAD
app.use(express.static(DIST_DIR));

=======
app.use(express.static(DIST_DIR))
>>>>>>> master


// app.use('/', index);
// app.use('/users', users);

<<<<<<< HEAD
app.get('*', (req, res, next) => {
  const filename = path.join(DIST_DIR, 'index.html')
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
    
})
=======
>>>>>>> master

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

<<<<<<< HEAD
=======


>>>>>>> master
module.exports = app;
