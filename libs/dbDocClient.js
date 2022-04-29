const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

const DBclient = new DynamoDBClient();
const dynamoDB = DynamoDBDocumentClient.from(DBclient);

/* Common Operations */

const scanTable = async (input) => {
  let startKey = {};
  const items = [];
  while (startKey) {
    const scanRegistrations = new ScanCommand({
      ...input,
      ExclusiveStartKey: startKey.id ? startKey : undefined,
    });
    const { Items: newItems, LastEvaluatedKey } = await dynamoDB.send(scanRegistrations);
    startKey = LastEvaluatedKey;
    items.push(...newItems);
  }
  return items;
};

const deleteItem = async (TableName, Key) => {
  const delete = new DeleteCommand({
    TableName,
    Key
  });
  await dynamoDB.send(delete);
};


module.exports = { dynamoDB, scanTable, deleteItem };
