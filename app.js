const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Short = require('./models/short')

const generateShort = require('./generate_short')

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error')
})

db.once('open', () => {
  console.log('mongoose connect')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/short', (req, res) => {
  res.render('index')
})

app.post('/short', (req, res) => {
  const origin = req.body.origin
  if (!origin) return res.redirect('/')

  Short.find({ origin: origin })
    .then(url => {
      if (url.length === 0) {
        console.log(url)
        const short = "http://localhost:3000/short/" + generateShort()
        Short.create({ origin, short })
          .catch(error => console.log(error))
        res.render('url', { short })



      } else if (url.length > 0) {
        res.render('url', { short: url[0].short })
        console.log(url)

      }
    })

  // const short = "http://localhost:3000/short/" + generateShort()
  // return Short.create({ origin, short })
  //   .then(() => res.render('index', { short }))
  //   .catch(error => console.log(error))

})

app.get('/short/:st', (req, res) => {
  const st = req.params.st
  return Short.findOne({ short: `http://localhost:3000/short/${st}` })
    .lean()
    .then(abc => res.redirect(`${abc.origin}`))
    .catch(error => console.log(error))

})


app.listen(3000, () => {
  console.log('app is running on http://localhost:3000')
})