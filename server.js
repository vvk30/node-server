const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');

app.set('view-engine', 'hbs');

app.use((req, res, next) => { //Logger Middleware
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to file');
    });
    next();
})

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (request, response) => {
    response.render('home.hbs', {
        userName: 'Vishal',
        pageTitle: 'Home Page',
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Invalid address'
    })
})

app.listen(3000);
