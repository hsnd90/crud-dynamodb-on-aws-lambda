import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { getById } from './index.js';

const update = async (client, tableName, data) => {
  let record = {};

  Object.keys(data).map((key) => {
    if (key !== 'id') record = { ...record, [':' + key]: data[key] };
  });

  let command = new UpdateCommand({
    TableName: tableName,
    Key: {
      id: data.id,
    },
    UpdateExpression: `set ${Object.keys(data)
      .map((x) => {
        if (x != 'id') return x + ' = :' + x;
      })
      .join(' ')}`,
    ExpressionAttributeValues: { ...record },
  });
  await client.send(command);
  return await getById(client, tableName, data.id);
};

export default update;
