require('dotenv').config();
const TABLES = require('./tables.json');
const { writeData } = require('./libs/helpers');
const { scanTable } = require('./libs/dbDocClient');

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
  } catch (err) {
    console.log(err);
  }
};
