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
      schedule = require('node-schedule')

const app = express()

app.use(morgan('dev'))
app.use(cors({
  origin: ['*'],
  methods: ['GET'],
  credentials: true
}))
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

// schedule.scheduleJob(deleteRule, () => {
//   require('./deleteNoLaborStandards.js')(MongoClient, url)
// })

require('./deleteNoLaborStandards.js')(MongoClient, url)

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err
  const db = client.db('usa-spending')
  require('./routes.js')(app, db, moment)
  app.listen(port, () => {
    console.log(`The API is accessible on port ${port}`)
  })
})
