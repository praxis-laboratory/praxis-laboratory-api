# Praxis Laboratory API

The Praxis Laboratory API is a free web service for developers to interact with Praxis Laboratory's real-time data. You can quickly, easily, and reliably send and retrieve data through the Praxis Laboratory API, searching, filtering, and limiting data as you require. All data adheres to the [OpenTHC](https://openthc.com/api/) data schemas to facilitate interoperability.

The following documentation describes how to authenticate, request data, and perform queries with the Praxis Laboratory API. You will find descriptions of possible errors, example requests and queries, and variable definitions.

 - [Overview](#Overview)
 - [Authentication](#Authentication)
 - [Endpoints](#Endpoints)
 - [Queries](#Queries)
   - [Limits](#Limits)
   - [Logical Operators](#Operators)
 - [Errors](#Errors)
 - [Examples](#Examples)
   - [Node.js](#Node)
   - [Python](#Python)
 - [Support](#Support)
 - [Contributing](#Contributing)
 - [License and Terms](#License)

You can get API support by emailing [support@prxslab.com](mailto:support@prxslab.com). Please don't hesitate to contact support to get started, report any issues, or recommend updates.


## <a name="Overview"></a>Overview

The base URL for the Praxis Laboratory API is https://api.praxis-laboratory/v1.

> Known Bug: The Praxis Laboratory API does not currently support requests to the root path at "/".


## <a name="Authentication"></a>Authentication


The Praxis Laboratory API utilizes API keys to restrict access to data. You will need to pass a `Praxis-API-Key` header with a valid API key generated from [https://portal.praxis-laboratory.com/api](https://portal.praxis-laboratory.com/api).

> The client portal API page is still in development, so, please email [support@prxslab.com](mailto:support@prxslab.com) to request an API key.

You can create and delete API keys as needed in your Praxis Laboratory client portal. Praxis Laboratory API keys expire 1 year after they are issued. Praxis Laboratory does not store API keys and cannot recover lost API keys.

Your private API keys are used for reading data from Praxis Laboratory and manipulating some of your sensitive client information. Your API Keys should be treated like your password, kept in a safe place and never exposed to the public.

Authentication occurs by passing your API Key in a `Praxis-API-Key` header.

```
{
    'content-type': 'application/json',
    'Praxis-API-Key': API_KEY,
}
```


## <a name="Endpoints"></a>Endpoints

The Praxis Laboratory API has the following endpoints:

| Endpoint | Description |
| --- | --- |
| `/samples` | Query sample details. |
| `/results` | Query sample results with detailed metrics. |

Sample details and results can be requested directly for any sample by adding a global ID path.

```
GET {base}/{path}/{global_id}
```

## <a name="Queries"></a>Queries

You can query samples with `GET` requests. For example,

```
GET {base}/samples?analyses_requested="Pesticides"
```

You can perform compound queries as well; for example,

```
GET {base}/samples?analyses_requested="Cannabinoids"&sample_type="Solid+Edible"
```

> Note that you need to escape spaces with `+`.

Below is a table of fields available for your queries.

| Field | Description |  Possible Values |
| --- | --- | --- |
| `analyses_requested` | The analyses requested for the sample. | `aW`, `Cannabinoids`, `FM`, `Heavy+Metals`, `Micro`, `Moisture`, `Myco`, `NMQA`, `Pesticides`, `RS`, and `Terpenes`.|
| `completed_at` | The time analyses were completed for the sample. | An ISO8601-date. |
| `external_id` | An ID provided for the sample by the client. | Any client-provided string value. |
| `global_id` | The WA traceability `original_global_id` for the sample or a unique ID provided by the client for non-I-502 samples. | Typically in the form `WA{client_license}.INxxxxx`, a client-provided string value, or `n\a` if no ID is provided. |
| `lab_id` | A Praxis Laboratory assigned unique ID. | Typically an ID in the form `Pyymmdd ###`. |
| `lab_result_id` | The WA traceability `lab_result_id` for the sample. | Typically in the form `WA{lab_license}.LRxxxx`. |
| `product_name` | The product name for the sample. | A client-provided string. |
| `project_id` | A Praxis Laboratory assigned project ID associated with the sample and all other samples transferred at the same time by a given client. | Typically in the form `Pyymmdd`. |
| `received_at` | The time that the sample were received at the laboratory. | An ISO8601-date. |
| `sample_type` | The type of the sample. | A client-provided string. |
| `updated_at` | The time that the sample details or results were last edited. | An ISO8601-date. |


### <a name="Limits"></a>Limits

You can limit any query with the `limit` parameter. For example,

```
GET {base}/samples?limit=50
```


### <a name="Operators"></a>Logical Operators

You can add the following logical operators to your queries.

| Operator | Description                 |
| -------- | --------------------------- |
| `gt`     | Greater Than                |
| `gte`    | Greater Than or Equal To    |
| `lt`     | Less Than                   |
| `lte`    | Less Than or Equal To       |

You can use

* A two-ISO8601-date timestamp interval;
* An open-ended, single-ISO8601-date interval.

Operators must be followed by colons; for example,

```
GET {base}/samples?received_at=gt:2019-04-20T16:20Z
```

or

```
GET {base}/samples?updated_at=gt:2019-10-12T00:00-07&updated_at=lte:2019-12-15T00:00-07
```

## <a name="Errors"></a>Errors

Failed requests to the API will return an `error` message. General error codes are given in the table below.

| Code | Description |
| --- | --- |
| 200 |  Success, no error. |
| 400 |  Invalid request URI or header or unsupported nonstandard parameter. |
| 401 |  Authorization required. |
| 403 |  Unsupported standard parameter or authentication or authorization failed. |
| 404 |  Resource not found. |
| 500 |  Internal error. This is the default code that is used for all unrecognized server errors. |

> Requests to the root path and any unrecognized paths result in the following error message.

```
{
 "code": 5,
 "message": "Method does not exist.",
 "details": [
  {
   "@type": "type.googleapis.com/google.rpc.DebugInfo",
   "stackEntries": [],
   "detail": "service_control"
  }
 ]
}
```

## <a name="Examples"></a>Examples

Node.js and Python examples can be found in the `examples` folder. If you want to implement the Praxis Laboratory API in another language, then we are always happy to incorporate contributions that you would like to make to the official repository.

You can clone the repository and use, adapt, and explore the examples at your pleasure.

```
git clone https://github.com/praxis-laboratory/praxis-laboratory-api.git
```

```
cd praxis-laboratory-api
```


### <a name="Node"></a>Node.js

First, install the dependencies for the examples:

```
npm install
```

Next, change directory to the `nodejs` folder in `examples`:

```
cd examples/nodejs
```

You can then run the get samples example:

```
node samples.js
```

You can also run the get results example:

```
node results.js
```


### <a name="Python"></a>Python

First, change directory to the `python` folder in `examples`:

```
cd examples/python
```

Next, you can execute the samples example:

```
python samples.py
```

You can also run the get results example:

```
python results.py
```


## <a name="Support"></a>Support

You can email [support@prxslab.com](support@prxslab.com) for help with the Praxis Laboratory Client Portal API.


## <a name="Contributing"></a>Contributing

Please refer to the [contributing](https://github.com/praxis-laboratory/docs/contributing) page for more information about how you can contribute to this project. We welcome bug reports, feature requests, code review feedback, and also pull requests.


## <a name="License"></a>License and Terms

The Praxis Laboratory API is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).

Your use of the Praxis Laboratory API is governed by the [Terms of Service for Praxis Laboratory](https://praxis-laboratory.com/terms-of-service).
