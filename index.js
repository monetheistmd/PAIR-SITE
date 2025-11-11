const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8000;



require('events').EventEmitter.defaultMaxListeners = 500;
const __path = process.cwd();





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.use('/pair', require('./pair'));




app.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}\n`);
});

module.exports = app;
