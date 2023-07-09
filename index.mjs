import * as dotenv from 'dotenv';
dotenv.config();
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import {
  getAll,
  getById,
  create,
  update,
  remove,
  getBy,
} from './dynamodb/index.js';
import {
  MISSING_TABLENAME,
  MISSING_ID,
  MISSING_BODY,
} from './error-responses.js';

let client;

if (process.env.NODE_ENV === 'development') {
  client = new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
  });
} else if (process.env.NODE_ENV === 'production') {
  client = new DynamoDBClient();
}

const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  let httpMethod = event.httpMethod ?? event.requestContext?.http?.method;

  let tableName =
    process.env.TABLE_NAME ??
    event.queryStringParameters?.tableName ??
    event.tableName;

  let id = event?.id ?? event.queryStringParameters?.id;

  let prop = event?.prop ?? event.queryStringParameters?.prop;
  let value = event?.value ?? event.queryStringParameters?.value;

  let body =
    event?.body && typeof event.body == 'string'
      ? JSON.parse(event.body)
      : event?.body
      ? event.body
      : null;

  if (!tableName) return MISSING_TABLENAME;

  async function setResponse(data) {
    return {
      headers: { 'content-type': 'application/json' },
      statusCode: 200,
      body: data,
    };
  }

  async function getAllRecord() {
    let result = await getAll(docClient, tableName);
    return setResponse(result);
  }

  async function getRecordById(id) {
    if (!id) return MISSING_ID;
    let result = await getById(docClient, tableName, id);
    return setResponse(result);
  }

  async function getRecordByQuery(query) {
    let result = await getBy(docClient, tableName, query.prop, query.value);
    return setResponse(result);
  }

  async function createRecord(data) {
    if (!data) return MISSING_BODY;
    let result = await create(docClient, tableName, data);
    return setResponse(result);
  }

  async function updateRecord(body) {
    if (!body) return MISSING_BODY;
    if (!body.id) return MISSING_ID;
    let result = await update(docClient, tableName, body);
    return setResponse(result);
  }

  async function removeRecord(id) {
    if (!id) return MISSING_ID;
    let result = await remove(docClient, tableName, id);
    return setResponse(result);
  }

  switch (httpMethod) {
    case 'GET':
      if (id) return await getRecordById(id);
      else if (prop && value) return await getRecordByQuery({ prop, value });
      else return await getAllRecord();
    case 'POST':
      return await createRecord(body);
    case 'PATCH':
      return await updateRecord(body);
    case 'DELETE':
      return await removeRecord(id);
  }
};

console.log(
  await handler({
    tableName: 'news',
    httpMethod: 'GET',
    prop: 'newsId',
    value: '-1807879164',
  })
);
