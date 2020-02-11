/**
 * Praxis Laboratory API - Samples Endpoint Example
 * Author: Keegan Skeate
 * Created: 2/10/20
 * Updated: 2/10/20
 * 
 * Example requests to the /samples endpoint:
 * 
 *    1. Request with no filter.
 *    2. Query by lab Id.
 *    3. Query by analysis.
 *    4. Query by analysis and sample type.
 *    5. Request with a limit
 *    6. Request an open time range.
 *    7. Request a closed time range
 */
const fetch = require('node-fetch');

// Mock API key to be replaced with client portal issued API key in production
var apiKey = '6_XThlW2CeXBWG5WgPiQyJo58mRF8g3HIdz-UNh5wIUmCqN22Et_1Q';
var baseUrl = 'https://api.praxis-laboratory.com/v1';
var path = '/samples';
var queries = [
  '',
  '?global_id="WAL20.INxxx15"',
  '?lab_id="v1003-Test 014"'.replace(' ', '+'),
  '?analyses_requested="Cannabinoids"',
  '?analyses_requested="Cannabinoids"&sample_type="Solid+Edible"',
  '?limit=5',
  '?updated_at=gt:2019-10-12T00:00-07',
  '?updated_at=gt:2019-10-12T00:00-07&updated_at=lte:2019-10-15T00:00-07',
];

function getSamples(query) {
  return new Promise((resolve, reject) => {
    var url = baseUrl + path + query;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Praxis-API-Key': apiKey,
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('\nRequest:', url);
      console.log(`Response: ${data.length} samples.`);
      resolve(data);
    }).catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}

queries.forEach((query) => {
  getSamples(query)
});
