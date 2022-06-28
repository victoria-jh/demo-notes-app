import * as uuid from "uuid";
import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

//we want to make our Lambda function, async, and simply return the results
//also want to simplify calls to DynamoDB. Don't want to create a new AWS.DynamoDB.DocumentClient()
//want to centrally handle errors in Lambda functions
//since all our Lambda functions will be handling API endpoints, we want to handle HTTP responses in one place
export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});