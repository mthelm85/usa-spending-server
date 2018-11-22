const MongoClient = require('mongodb').MongoClient,
      exec = require('child_process').exec

const url = 'mongodb://localhost:27017/usa-spending'

MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
  if (err) throw err
  const db = client.db('usa-spending'),
        res = await db.collection('awards').deleteMany({})
  console.log(`Deleted ${res.deletedCount} documents`)
  client.close(() => {
    const cmd = 'mongoimport -d usa-spending -c awards --type csv data.csv --headerline'
    exec(cmd, (err, stdout, stderr) => {
      if (err) throw err
      console.log(stdout)
      console.log(stderr)
    })
  })
})


// Better performance to simply delete all docs in the collection and then import again
// use MongoClient to call db.collection.drop(), then above code to import
