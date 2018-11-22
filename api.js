const bodyParser = require('body-parser'),
      cors = require('cors'),
      exec = require('child_process').exec,
      express = require('express'),
      getData = require('./getData.js'),
      moment = require('moment'),
      MongoClient = require('mongodb').MongoClient,
      morgan = require('morgan'),
      url = 'mongodb://localhost:27017/usa-spending',
      schedule = require('node-schedule')

const app = express(),
      port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(cors({
  origin: ['*'],
  methods: ['GET'],
  credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = [0, 1, 2, 3, 4]
rule.hour = 1
rule.minute = 0

schedule.scheduleJob(rule, () => {
  require('./updateMongo.js')(exec, getData, MongoClient, url)
})

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err
  const db = client.db('usa-spending')
  require('./routes.js')(app, db, moment)
  app.listen(port, () => {
    console.log(`The API is accessible on port ${port}`)
  })
})
