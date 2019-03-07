const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
var path = require('path');
const rp = require('request-promise');



const userURL = require('./routes/user');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));



// middleware

app.use((req, res, next) => {
  console.log('this is middleware');
  next();
})




app.get('', function (req, res) {
  res.send('default page');
})

app.get('/requestpromise', function (req, res) {

  options = {
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    json: true,
    // headers: {
    //   'secret-key': process.env.REST_API_KEY, 'User-Agent': 'Request-Promise'
    // }

  };

  rp(options)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.send('error');
    })




})



app.use('/user', userURL);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {

  res.locals.message = err.message;

  res.status(err.status || 500);
  res.render('error');
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))