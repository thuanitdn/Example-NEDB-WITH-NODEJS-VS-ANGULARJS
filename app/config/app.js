/**
 * Created by thuanle on 1/8/2016.
 */
var express=require('express');
var compression=require('compression');
var appProperties=require('./properties/AppProperties.json');
var swig=require("swig");
var bodyParser=require('body-parser');
var expressValidator=require('express-validator');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var session=require('express-session');
var flash = require('connect-flash');
var env = process.env.NODE_ENV || 'development';
module.exports= function (app,passport) {
    /**
     * compression middleware
     */
    app.use(compression({
        threshold:512
    }));
    /**
     * static folder
     */
    app.use(express.static(appProperties.properties.staticFolder));
    /**
     * view engine
     */ if(env =='development' || env == 'test')
    {
        swig.setDefaults({
            cache: false
        });
    }
    app.engine('html', swig.renderFile);
    app.set('views',appProperties.properties.viewFolder);
    app.set('view engine', 'html');
    /**
     * bodyParser for app
     */
    app.use(bodyParser.json({
        limit:'20mb'
    }));
    app.use(bodyParser.urlencoded({
        extended:true,
        limit:'20mb'
    }));
    /**
     * config cookieParser
     */
    app.use(cookieParser());
    app.use(cookieSession({secret: 'secret'}));
    //app.use(session({cookie: {maxAge: 60000}}));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'secret'
    }));
    /**
     * config passport
     */
    app.use(passport.initialize());
    app.use(passport.session());
    /**
     * config flash message to views
     */

    app.use(flash());
    /**
     * config express-validator
     */
    app.use(expressValidator());
    /**
     * config cache layouts swig for development and test
     */
}