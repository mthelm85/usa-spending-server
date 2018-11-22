const axios = require('axios'),
      download = require('download'),
      fs = require('fs')

axios.post('https://api.usaspending.gov/api/v2/bulk_download/awards', {
  "award_levels": ["prime_awards"],
  "filters": {
      "award_types": ["contracts"],
      "agency": "all",
      "date_type": "action_date",
      "date_range": {
          "start_date": "2017-11-22",
          "end_date": "2018-11-22"
      },
      "place_of_performance_locations": [
          {
          "country": "USA",
          "state": "OK"
          }
     ]
  },
  "columns": [],
  "file_format": "csv"
})
.then(async (res) => {
  console.log(res.data)
  await download(res.data.url, './', {
    extract: true
  })
})
.catch((err) => {
  console.log(err)
})
