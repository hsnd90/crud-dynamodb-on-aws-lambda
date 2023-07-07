import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

const remove = async (client, tableName, id) => {
  let command = new DeleteCommand({
    TableName: tableName,
    Key: {
      id,
    },
  });
  await client.send(command);
  return {
    success: true,
    Result: null,
  };
};

export default remove;
