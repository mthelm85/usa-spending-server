const bodyParser = require('body-parser'),
      cors = require('cors'),
      exec = require('child_process').exec,
      express = require('express'),
      getData = require('./getData.js'),
      moment = require('moment'),
      MongoClient = require('mongodb').MongoClient,
      morgan = require('morgan'),
      port = process.env.PORT || 3000,
      url = 'mongodb://localhost:27017/usa-spending',
      schedule = require('node-schedule'),
      whitelist = ['http://localhost:8080']

const app = express(),
      corsOptions = {
        origin (origin, callback) {
          if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
          } else {
            callback(new Error('Not allowed by CORS'))
          }
        }
      }

app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const updateRule = new schedule.RecurrenceRule()
updateRule.dayOfWeek = [0, 1, 2, 3, 4]
updateRule.hour = 1
updateRule.minute = 0

const deleteRule = new schedule.RecurrenceRule()
deleteRule.dayOfWeek = [0, 1, 2, 3, 4]
deleteRule.hour = 2
deleteRule.minute = 0

schedule.scheduleJob(updateRule, () => {
  require('./updateMongo.js')(exec, getData, MongoClient, url)
})

schedule.scheduleJob(deleteRule, () => {
  require('./purgeDB.js')(MongoClient, url)
})

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err
  const db = client.db('usa-spending')
  require('./routes.js')(app, db, moment)
  app.listen(port, () => {
    console.log(`The API is accessible on port ${port}`)
  })
})
