module.exports = async (exec, getData, MongoClient, url) => {
  await getData.updateData()
  MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
    if (err) throw err
    const db = client.db('usa-spending'),
          res = await db.collection('awards').deleteMany({})
    console.log(`Deleted ${res.deletedCount} documents`)
    await client.close()
  })
  const cmd = 'mongoimport -d usa-spending -c awards --type csv all_contracts_prime_transactions_1.csv --headerline'
  exec(cmd, (err, stdout, stderr) => {
    if (err) throw err
    console.log(stdout)
    console.log(stderr)
  })
}
