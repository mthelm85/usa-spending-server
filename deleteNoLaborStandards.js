module.exports = (MongoClient, url) => {
  MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
    if (err) throw err
    const db = client.db('usa-spending'),
          res = await db.collection('awards').deleteMany({
            $or: [{ labor_standards: 'NOT APPLICABLE' }, { labor_standards: 'NO' }]
          })
    console.log(`Deleted ${res.deletedCount} documents`)
  })
}
