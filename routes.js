module.exports = (app, db, moment) => {
  app.get('/', (req, res) => {
    db.collection('awards')
    .find({ $and: [
      { 'primary_place_of_performance_state_code': req.query.state_code },
      { 'primary_place_of_performance_county_name': req.query.county_name }
    ] })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

  app.get('/zip', (req, res) => {
    db.collection('zip_latlng')
    .find({ ZIP: req.query.zip })
    .toArray((err, docs) => {
      res.json({ results: docs })
    })
  })
}
