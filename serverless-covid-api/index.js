const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-2",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "covid-data";
const healthPath = "/health";
const countriesPath = "/countries";
const countryPath = "/country";

exports.handler = async function (event) {
  console.log("Request event:", event);
  let response;

  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === "GET" && event.path === countriesPath:
      response = await getCountries();
      break;
    case event.httpMethod === "GET" && event.path === countryPath:
      response = await getCountry(event.queryStringParameters.countryName);
      break;
    case event.httpMethod === "POST" && event.path === countryPath:
      response = await saveCountry(JSON.parse(event.body));
      break;
    case event.httpMethod === "DELETE" && event.path === countryPath:
      response = await deleteCountry(JSON.parse(event.body).countryName);
  }
  return response;
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify(body),
  };
}

async function getCountry(countryName) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      countryName: countryName,
    },
  };
  return (
    await dynamodb
      .get(params)
      .promise()
      .then((response) => {
        return buildResponse(200, response.Item);
      }),
    (error) => {
      console.error("getCountry error:", error);
    }
  );
}

async function getCountries() {
  const params = {
    TableName: dynamodbTableName,
  };
  const allCountries = await scanDynamoRecords(params, []);
  const body = {
    countries: allCountries,
  };
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    console.error(
      error
    );
  }
}

async function saveCountry(requestBody) {
  const requestBodyWithDate = { ...requestBody, dateStamp: Date.now() };

  const params = {
    TableName: dynamodbTableName,
    Item: requestBodyWithDate,
  };
  return await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          Item: requestBodyWithDate,
        };
        return buildResponse(200, body);
      },
      (error) => {
        console.error(
          error
        );
      }
    );
}
