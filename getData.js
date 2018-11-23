const axios = require('axios'),
      download = require('download'),
      fs = require('fs'),
      moment = require('moment')

const updateData = async () => {
  const body = {
    "award_levels": ["prime_awards"],
    "filters": {
        "award_types": ["contracts"],
        "award_amounts": [
          { "lower_bound": 500000.00 }
        ],
        "agency": "all",
        "date_type": "action_date",
        "date_range": {
            "start_date": `${moment().subtract(1, 'years').format('YYYY-MM-DD')}`,
            "end_date": `${moment().format('YYYY-MM-DD')}`
        },
        "place_of_performance_locations": [
            {
            "country": "USA"
            }
       ]
    },
    "columns": [
      "award_id_piid",
      "parent_award_agency_name",
      "current_total_value_of_award",
      "potential_total_value_of_award",
      "period_of_performance_start_date",
      "period_of_performance_current_end_date",
      "period_of_performance_potential_end_date",
      "awarding_agency_name",
      "awarding_sub_agency_name",
      "funding_agency_name",
      "funding_sub_agency_name",
      "recipient_name",
      "recipient_doing_business_as_name",
      "recipient_parent_name",
      "recipient_address_line_1",
      "recipient_city_name",
      "recipient_state_code",
      "recipient_zip_4_code",
      "recipient_phone_number",
      "primary_place_of_performance_city_name",
      "primary_place_of_performance_county_name",
      "primary_place_of_performance_state_code",
      "primary_place_of_performance_zip_4",
      "award_description",
      "solicitation_identifier",
      "naics_code",
      "naics_description",
      "labor_standards",
      "construction_wage_rate_requirements",
      "organizational_type",
      "number_of_employees",
      "annual_revenue"
    ],
    "file_format": "csv"
  }
  let res = await axios.post('https://api.usaspending.gov/api/v2/bulk_download/awards', body)
  console.log(res.data)
  await download(res.data.url, './', {
    extract: true
  })
  .catch((err) => {
    console.log(err)
  })
}

module.exports = {
  updateData
}
