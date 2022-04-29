require('dotenv').config();
const dbTables = require('./tables.json');
const { writeData } = require('./libs/helpers');
const { dynamoDB } = require('./libs/dbDocClient');
const { scanTable } = require('./libs/dbOperations');
const { UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

const tables = dbTables.dev;

const fetchData = async () => {
  const registrations = await scanTable({
    TableName: tables.registration,
    AttributesToGet: ['id'],
  });
  await writeData('registrations', registrations);
};

const run = async () => {
  try {
    // 1. Fetch data from DynamoDB (comment out after first run)
    await fetchData();

    // 2. Read data from file
    const registrations = require('./data/registrations.json');

    // 3. Process data
    for (const registration of registrations) {
      console.log(registration.id);
    }

    // 4. Mutate data
    // Update item
    const update = new UpdateCommand({
      TableName: tables.registration,
      Key: { id: 'TEST_ID', tennantId: 'TEST_TENNANT_ID' },
      AttributeUpdates: {
        userId: ' NEW_USER_ID',
      },
    });
    await dynamoDB.send(update);

    // Delete item
    const deleteCommand = new DeleteCommand({
      TableName: tables.registration,
      Key: {
        id: 'TEST_ID',
        tennantId: 'TEST_TENNANT_ID',
      },
    });
    await dynamoDB.send(deleteCommand);
  } catch (err) {
    console.log(err);
  }
};

run();
