/**
 * Created by thuanle on 1/8/2016.
 */
var extend = require('util')._extend;
var productionEnv=require('./env/ProductionEnv.js');
var testEnv=require('./env/TestEnv.js');
var developmentEnv=require('./env/DevelopmentEnv.js');
/**
 * expose
 */
module.exports={
    production:extend(productionEnv),
    test:extend(testEnv),
    development:extend(developmentEnv)
}[process.env.NODE_ENV || 'production'];