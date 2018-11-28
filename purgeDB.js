module.exports = (MongoClient, url) => {
  MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
    if (err) throw err
    const db = client.db('usa-spending'),
          res = await db.collection('awards').deleteMany({
            $or: [
              { labor_standards: 'NOT APPLICABLE' },
              { labor_standards: 'NO' },
              { current_total_value_of_award: { $lt: 500000 } }
            ]
          })
    console.log(`Deleted ${res.deletedCount} documents`)
  })
}
