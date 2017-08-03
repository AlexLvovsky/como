// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// const color = require('dominant-color');
const getColors = require('get-image-colors');
const fs = require('fs');

// Get our API routes
const router = express.Router();

const app = express();

// Parsers for POST data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false,limit: '50mb' }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));



// Set our api routes
app.use('/api', router);

router.route('/style')
  .post((req, res) => {
    const ext = req.body.image.split(';')[0].match(/jpeg|png|gif/)[0];
// strip off the data: url prefix to get just the base64-encoded bytes
    const data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
    const buf = new Buffer(data, 'base64');
    fs.writeFile(path.join(__dirname, './image.' + ext), buf, (err) => {
      if (err) {
        return console.log("Error writing file: " + err);
      }
      getColors(path.join(__dirname, './image.' + ext))
        .then(colors => {
          // `colors` is an array of color objects
          // console.log('getColors: ', colors);
          res.json(colors);
        })
        .catch(() => {
          // console.log('Promise Rejected ', arguments);
          res.json({err: 'Bad image!'});
        });
    });
  });
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
