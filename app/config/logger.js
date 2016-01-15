/**
 * Created by thuanle on 1/8/2016.
 */
var winston=require('winston');
var appProperties=require('./properties/AppProperties.json');
var logger = new (winston.Logger)({
  transports: [
  	new (winston.transports.File)({
      name: 'info-file',
      filename: appProperties.properties.fileLoggerInfo,
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename:appProperties.properties.fileLoggerError ,
      level: 'error'
    })
  ]
});

module.exports=logger;