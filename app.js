#!/usr/bin/env node

var argv = require('optimist')
  .usage('usage: geologist --port [port] --minecrafthost [host] --queryport [query port] --rconport [rcon port] --rconpassword [rcon password]')
  .demand(['port', 'minecrafthost', 'queryport', 'rconport', 'rconpassword'])
  .argv;

var express = require('express');
var app = express.createServer();

app.configure(function() {
  app.use(express.bodyParser());
});

var Query = require('./vendor/mcquery');
var query = new Query();

var Rcon = require('./vendor/node-rcon').newHandle;
var rcon = new Rcon();

app.get('/stats', function (req, res) {
  res.contentType('application/json');
  query.startSession(argv.minecrafthost, argv.queryport, function (err, session) {
    if (err) {
      res.status(504);
      res.send({"error": "unable to connect to server"});
      return;
    }

    query.full_stat(session, function (err, stat) {
      if (err) {
        res.status(502);
        res.send({"error": "unable to retrieve stats"});
        return;
      }

      res.send(stat);
    });
  });
});

app.post('/command', function (req, res) {
  res.contentType('application/json');
  rcon.connect(argv.minecrafthost, argv.rconport, argv.rconpassword, function (err, response) {
    if (err) {
      res.status(504);
      res.send({"error": "unable to connect to server"});
      return;
    }

    rcon.sendCommand(req.body.command, function (err, response) {
      if (err) {
        res.status(502);
        res.send({"error": "unable send rcon command"});
        return;
      }

      res.send(response);
    });
  });
});

app.listen(argv.port);
