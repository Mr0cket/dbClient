/* Common db Operations */

const { ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { dynamoDB } = require('./dbDocClient');

/**
 *  Return all the records from the table
 **/
const scanTable = async (input) => {
  let startKey = {};
  const items = [];
  while (startKey) {
    const scan = new ScanCommand({
      ...input,
      ExclusiveStartKey: startKey.id ? startKey : undefined,
    });
    const { Items: newItems, LastEvaluatedKey } = await dynamoDB.send(scan);
    startKey = LastEvaluatedKey;
    items.push(...newItems);
  }
  return items;
};

module.exports = { scanTable };
