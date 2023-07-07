import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 } from 'uuid';

const create = async (client, tableName, data) => {
  let record = {
    id: v4(),
    ...data,
  };
  let command = new PutCommand({
    TableName: tableName,
    Item: record,
  });
  await client.send(command);
  return { Result: record, success: true };
};

export default create;
