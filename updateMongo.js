module.exports = async (exec, getData, MongoClient, url) => {
  await getData.updateData()
  MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
    if (err) throw err
    const db = client.db('usa-spending'),
          res = await db.collection('awards').deleteMany({})
    console.log(`Deleted ${res.deletedCount} documents`)
    await client.close()
    const cmd1 = 'mongoimport -d usa-spending -c awards --type csv all_contracts_prime_transactions_1.csv --headerline'
    const cmd2 = 'mongoimport -d usa-spending -c awards --type csv all_contracts_prime_transactions_2.csv --headerline'
    const cmd3 = 'mongoimport -d usa-spending -c awards --type csv all_contracts_prime_transactions_3.csv --headerline'
    const cmd4 = 'mongoimport -d usa-spending -c awards --type csv all_contracts_prime_transactions_4.csv --headerline'
    exec(cmd1, (err, stdout, stderr) => {
      if (err) throw err
      console.log(stdout)
      console.log(stderr)
    })
    exec(cmd2, (err, stdout, stderr) => {
      if (err) throw err
      console.log(stdout)
      console.log(stderr)
    })
    exec(cmd3, (err, stdout, stderr) => {
      if (err) throw err
      console.log(stdout)
      console.log(stderr)
    })
    exec(cmd4, (err, stdout, stderr) => {
      if (err) throw err
      console.log(stdout)
      console.log(stderr)
    })
  })
}
