var express = require('express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var file = './data.json';

var quotes = [];
try {
  quotes = jsonfile.readFileSync(file);
} catch (e) {
  saveQuotes();
}

var app = express();
app.use(bodyParser.json());
// app.post("/todos", validate);
// app.put("/todos/:id", validate);

app.get('/quotes', function (req, res) {
  res.json(quotes);
});

app.post('/quotes', function (req, res) {
  quotes.push(req.body);
  saveQuotes();
  res.json(req.body);
});

app.put('/quotes/:id', function (req, res) {
  const item = quotes.find((item) => item.id === req.body.id);
  const index = quotes.indexOf(item);
  quotes[index] = req.body;
  saveQuotes();
  res.json(req.body);
});

// function validate(req, res, next) {
//   console.log("req.body", req.body);
//   if (!req.body.id) {
//     return res.sendStatus(400);
//   }
//   //   if (req.body.value.length < 2) {
//   //     res.status("Value should be minimum 2 digits length");
//   //     return res.sendStatus(400);
//   //   }
//   next();
// }

function saveQuotes() {
  jsonfile.writeFileSync(file, quotes);
}

app.listen(1906);
console.log('running server on port 1906');
