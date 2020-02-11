# -*- coding: utf-8 -*-
"""
Praxis Laboratory API - Samples Endpoint Example
Author: Keegan Skeate
Created: 10/19/19
Updated: 2/10/20

Example requests to the /samples endpoint:
    
    1. Request with no filter.
    2. Query by lab Id.
    3. Query by analysis.
    4. Query by analysis and sample type.
    5. Request with a limit
    6. Request an open time range.
    7. Request a closed time range

"""
import requests

# Mock API key to be replaced with client portal issued API key in production
API_KEY = '6_XThlW2CeXBWG5WgPiQyJo58mRF8g3HIdz-UNh5wIUmCqN22Et_1Q'
BASE = 'https://api.praxis-laboratory.com/v1'
HEADERS = {
    'content-type': 'application/json',
    'Praxis-API-Key': API_KEY,
}

def get_samples(query):
    """
    Get samples with a given query.
    """
    url = BASE + '/samples' + query
    print('\nRequest:', url)
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        data = response.json()
        print(f'Response: { len(data) } samples.')
        return data
    else:
        print('Error:', response.status_code, response.text)
        return []

responses = []
queries = [
        '',
        '?global_id="WAL20.INxxx15"',
        '?lab_id="v1003-Test 014"'.replace(' ', '+'),
        '?analyses_requested="Cannabinoids"',
        '?analyses_requested="Cannabinoids"&sample_type="Solid+Edible"',
        '?limit=5',
        '?updated_at=gt:2019-10-12T00:00-07',
        '?updated_at=gt:2019-10-12T00:00-07&updated_at=lte:2019-10-15T00:00-07',
]
for query in queries:
    data = get_samples(query)
    responses.append(data)
