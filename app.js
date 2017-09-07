const express = require('express'),
      path = require('path')


const favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport')
      
const api = require('./routes/api'),
      authenticate = require('./routes/authenticate')(passport),
      mongoose = require('mongoose')
mongoose.connect('mongodb://manizmtask:superkey@ds127864.mlab.com:27864/task_todo')

const app = express();


const DIST_DIR = path.join(__dirname, 'dist'),
      HTML_FILE = path.join(DIST_DIR, 'index.html'),
      isDevelopment = process.env.NODE_ENV !== 'production'

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



/* MIDDLEWARES */

app.use(logger('dev'))
app.use(session({
  secret: 'copy cat'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// if (isDevelopment) {
//   const webpack = require('webpack')
//   const webpackDevMiddleware = require('webpack-dev-middleware')
//   const webpackHotMiddleware = require('webpack-hot-middleware')
//   const config = require('./webpackconfig/webpack.dev.config')
//   const compiler = webpack(config)
//   const devMiddleWare = webpackDevMiddleware(compiler)
//   app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//     stats: {
//       colors: true,
//       hash: false,
//       timings: true,
//       chunks: false,
//       chunkModules: false,
//       modules: false
//     }
//   }))
  
//   app.use(webpackHotMiddleware(compiler))
//   app.use(express.static(DIST_DIR))
//   app.get('/', (req, res, next) => {
//     compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
//       if (err) {
//         return next(err)
//       }
//       res.set('content-type', 'text/html')
//       res.send(result)
//       res.end()
//     })
      
//   })
// }

// else {
//   app.use(express.static(DIST_DIR))
//   app.get('/', (req, res) => res.sendFile(HTML_FILE))
// }

app.use(express.static(DIST_DIR))
/* BOTTOM OF THE MIDDLEWARE CHAIN */
app.use(passport.initialize())
app.use(passport.session())

/* ROUTES */
app.use('/auth', authenticate)
app.use('/api', api)
app.get('/', (req, res) => res.send({message: 'hello'}))


/* ERROR HANDLING */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env' === 'development')) {
  app.use((err, req, res, next) => {

  })
}


// Initialize passport
const initPassport = require('./passport.init')
initPassport(passport)


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
