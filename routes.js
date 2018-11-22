module.exports = (app, db, moment) => {
  app.get('/', (req, res) => {
    res.json({ result: 'it worked : )' })
  })
}
