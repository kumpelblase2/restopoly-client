// Just workaround
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.PlayerStore = require('./lib/player-store')();

var events = require('./routes/websocket');
var game = require('./routes/client_game');
require('./routes/websocket_init')(app.PlayerStore, io, [game]);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/event', events(app));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = parseInt(process.env.PORT || '3000');
app.set('port', port);

var resolver = require('./lib/service-resolver');
resolver('https://vs-docker.informatik.haw-hamburg.de/ports/8053', [
    { value: 'games' },
    { value: 'boards' }
]).then(function(hosts) {
    server.listen(port, function() {
        console.log('listening on ' + port);
    });
});