const express = require('express')
const path = require('path')


const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('passport')

require('./backend/models/models')

// session middleware to not store sessions in memory
// otherwise leaks memory
const store = new MongoDBStore({
  uri: 'mongodb://manizmtask:todotask@ds127864.mlab.com:27864/task_todo',
  collection: 'expressSessions'
})

// Catch errors
store.on('error', function(err) {
  assert.ifError(err)
  assert.ok(false)
})


// const index = require('./routes/index')
const api = require('./routes/api')
const authenticate = require('./routes/authenticate')(passport)
const mongoose = require('mongoose')
mongoose.connect('mongodb://manizmtask:todotask@ds127864.mlab.com:27864/task_todo')

const app = express();


const DIST_DIR = path.join(__dirname, 'dist'),
      HTML_FILE = path.join(DIST_DIR, 'index.html'),
      isDevelopment = process.env.NODE_ENV !== 'production'

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



/* MIDDLEWARES */

app.use(logger('dev'))
app.use(session({
  secret: 'copy cat',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store, resave: true, saveUninitialized: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

if (isDevelopment) {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpackconfig/webpack.dev.config')
  const compiler = webpack(config)
  const devMiddleWare = webpackDevMiddleware(compiler)
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
  app.use(express.static(DIST_DIR))
  app.use(passport.initialize())
  app.use(passport.session())
  app.get('/', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
      
  })
}

else {
  app.use(express.static(DIST_DIR))
  app.use(passport.initialize())
  app.use(passport.session())
  app.get('/', (req, res) => res.sendFile(HTML_FILE))
}

/* BOTTOM OF THE MIDDLEWARE CHAIN */


/* ROUTES */

app.use('/auth', authenticate)
app.use('/api', api)
// app.use('/', (req, res) => res.send({message: 'hello'}))


/* ERROR HANDLING */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



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
