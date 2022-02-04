const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const os = require("os");

const wss = require('./dist/wss.js');
const db = require('./db.js');

const app = express();
app.use(express.static("public"));
app.use(cors());

const basePath = process.env.basepath || '';
const port = process.env.PORT || 8080;
const server = app.listen(port);

wss.init(server);
db.init();

let version = JSON.parse(fs.readFileSync('package.json', 'utf-8')).version;

app.get(basePath + '/', (req, res) => {
	if(wss.ready && db.ready) {
		res.status(200).render(__dirname + '/resources/index.ejs', {
			connections: db.totalConnections + 1,
			namespace: process.env.KUBERNETES_NAMESPACE || '-',
			version: version
		});
	} else {
		res.status(STATUS.SERVICE_UNAVAILABLE).send({ status: 'Unavailable' });
	}
});

app.get(basePath + '/health', (req, res) => {
  if (wss.ready && db.ready) {
    res.status(200).send({ status: 'OK' });
  } else {
    res.status(503).send({ status: 'Unavailable' });
  }
});

process.on('SIGTERM', () => {
  console.info('\n-- Received SIGTERM --\n');
  console.info('Current connections:', wss.currentConnections);

  wss.close();

  const waitForNoConnections = setInterval(async () => {
    if (wss.currentConnections === 0) {
      clearInterval(waitForNoConnections);

      await db.close();

      process.exit(0);
    }
  }, 1000);
});
