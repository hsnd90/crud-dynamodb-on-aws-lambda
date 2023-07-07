import { QueryCommand } from '@aws-sdk/lib-dynamodb';

const getById = async (client, tableName, id) => {
  let command = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    },
  });
  return { Result: (await client.send(command)).Items[0], success: true };
};

export default getById;
