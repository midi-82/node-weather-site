const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Serve up public folder contents
app.use(express.static(publicDirectoryPath));

const name ='M. Dietrich'

app.get('', (req, res) => {
    res.render('index', {
        text: 'Wheather: Sunny!',
        title: 'Wheather App',
        name
        });
})

app.get('/about', (req, res) => {
    res.render('about', {
        text: 'About us:',
        title: 'About page',
        name
        });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: name,
        message: 'In case of difficulties, call 0800/H-E-L-P'
        });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    } else {
        
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
              return res.send({error})  
            }

            forecast (latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/products', (req,res) => {
    const searchResult = req.query;
    console.log(searchResult)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Error - Help page not found',
        errorMessage: 'Specific help page not found.',
        name
        });
})

app.get('*', (req,res) => {
    res.render('error', {
        title: 'Page not found',
        errorMessage: 'Page not found',
        name
    })
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})