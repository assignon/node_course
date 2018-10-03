const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {

  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {

    if(err){console.log('append error');}

  })
  next();

});

// app.use((req, res, next) => {
//
//    res.render('maintnance.hbs');
//
// })

hbs.registerHelper('getCurrentYear', () => {

   return new Date().getFullYear();

});

hbs.registerHelper('capitalize', (text) =>
{

   return text.toUpperCase();

});

app.get('/', (req, res) =>{

   res.render('home.hbs',{

      welcom: 'welcom home, we are the history maker'

   });

});

app.get('/about', (req,res) => {

   res.render('about.hbs',{

      titel: 'About me'

   });

});


app.get('/wrong', (req,res) => {

   res.send({errMsg: 'this page does nt exist'});

});

app.listen(port, () =>{

   console.log(`server is ready ${port}`);

});
