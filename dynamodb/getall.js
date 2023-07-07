import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const getAll = async (client, tableName) => {
  let command = new ScanCommand({
    TableName: tableName,
  });

  let result = await client.send(command);
  return {
    Result: result.Items,
    Count: result.Count,
  };
};

export default getAll;
