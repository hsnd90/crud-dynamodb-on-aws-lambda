import { QueryCommand, ExecuteStatementCommand } from '@aws-sdk/lib-dynamodb';

const getBy = async (client, tableName, property, value) => {
  let command = new ExecuteStatementCommand({
    Statement: `SELECT * FROM ${tableName}  where ${property} = ${value}`,
  });
  return { Result: (await client.send(command)).Items[0], success: true };
};

export default getBy;
