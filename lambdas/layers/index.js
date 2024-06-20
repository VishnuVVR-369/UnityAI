const {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "us-east-1" });

const putItemToDynamoDb = async (TableName, Item) => {
  try {
    const data = await client.send(
      new PutItemCommand({
        TableName: TableName,
        Item: Item,
      })
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const getItemFromDynamoDb = async (TableName, Key) => {
  try {
    const data = await client.send(
      new GetItemCommand({
        TableName: TableName,
        Key: Key,
      })
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  putItemToDynamoDb,
  getItemFromDynamoDb,
};
