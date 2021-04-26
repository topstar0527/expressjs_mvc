var http = require('http'),
    https = require('https'),
    path = require('path'),
    fs = require('fs'),
    swig = require('swig'),
    express = require('express'),
    lib = require('./lib'),
    config = lib.config,
    app = express();


app
  .engine('html', swig.renderFile)
  .set('view engine', 'html')
  .set('views', express.static('views'));

app.use('/resources', express.static('public'));

(function(listener, app, config) {
  if(null !== config.getConfig().server.http) {
    http.createServer(app).listen(config.getConfig().server.http.port, function() {
      listener('HTTP');
    });
  }
  if(null !== config.getConfig().server.https) {
    var certs, privateKey, serverCert;
    privateKey = fs.readFileSync(config.getConfig().server.https.key, 'utf8');
    serverCert = fs.readFileSync(config.getConfig().server.https.cert, 'utf8');

    certs = {key: privateKey, cert: serverCert};

    https.createServer(certs, app).listen(config.getConfig().server.https.port, function() {
      listener('HTTPS');
    });
  }
})(function(listener) {
  console.log('%s listening', listener);
}, app, config);
