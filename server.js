var express = require('express');
var  app = express();
var http = require('http').Server(app);
var passport = require('passport');
var config=require('./app/config/config.js');
var port= process.env.PORT || 3000;
/**
 * bootstrap application config(connection nedb, status environment, ...)
 */
console.log(config.status);
console.log(process.env.NODE_ENV)
/**
 * bootstrap application settings
 */
require('./app/config/passport.js')(passport);
require('./app/config/app.js')(app,passport);
/**
 * bootstrap application route
 */
require('./app/http/routes.js')(app,passport);
require('./app/config/socketio.js')(http);
http.listen(port, function(){
    console.log('Listening on port '+ port);
});

module.exports=app;
