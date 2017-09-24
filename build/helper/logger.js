/**
 * Created by sam on 17-5-27.
 */


var memwatch = require('memwatch-next');
var monitor = require("os-monitor");



var winston = require('winston');
require('winston-papertrail').Papertrail;


var winstonPapertrail = new winston.transports.Papertrail({
    host: 'logs6.papertrailapp.com',
    port: 31837
});


var logger = new winston.Logger({
    transports: [winstonPapertrail]
});



memwatch.on('leak', function(info) {

    logger.warn("Memory leak detected");
    return logger.info(info);
});

monitor.start({ delay: 5000 // interval in ms between monitor cycles
    , freemem: 1024*1024*50 // freemem under which event 'freemem' is triggered
    , critical1: 0.7 // loadavg1 over which event 'loadavg1' is triggered
});


monitor.on('loadavg1', function(event) {


    logger.warn("Load average: " + monitor.os.loadavg()[0]);

    return logger.warn(' Load average is exceptionally high!');
});

monitor.on('freemem', function(event) {
    logger.warn(event.type, 'Free memory is very low!');

    return logger.warn(monitor.os.freemem() + ' bytes out of ' +  monitor.os.totalmem() + ' bytes avaible');
});


module.exports = {


    info: function (msg) {
        logger.info(msg);
    },

    warning: function(msg){
        logger.warning(msg);
    },

    error: function (msg) {
        logger.error(msg);
    },

    debug: function (msg) {
        logger.debug(msg);
    }
};
