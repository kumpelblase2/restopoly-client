// Just workaround
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/* Server stuff */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/* Libs */
app.PlayerStore = new (require('./lib/player-store'))();

/* Routes */
var events = require('./routes/websocket');

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
    console.log(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
});

var port = parseInt(process.env.PORT || '3000');
app.set('port', port);

require('./routes/websocket_init')(app.PlayerStore, io);
server.listen(port, function() {
    console.log('listening on ' + port);
});
