const express = require('express');
const path = require('path');
const port = process.env.PORT || 4200;
const dist = path.join(__dirname, '/dist/diploma-client-ang8');
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(dist));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(dist, 'index.html'));
});

app.listen(port);
