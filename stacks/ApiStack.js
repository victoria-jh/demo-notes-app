import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

//this new stack references table from the previously created StorageStack
export function ApiStack({ stack, app }) {
    const { table } = use(StorageStack);
  
    // Create the API using SST's Api construct
    const api = new Api(stack, "Api", {
      defaults: {
        function: {
          permissions: [table], //giving API permission to access our DynamoDB table
          environment: {
            TABLE_NAME: table.tableName, //passing in the name of our DynamoDB table as an
            //environment variable called TABLE_NAME (needed to query our table)
          },
        },
      },
      routes: {
        "GET /notes": "functions/list.main",
        "POST /notes": "functions/create.main", //this first route will be used to create a note
        "GET /notes/{id}": "functions/get.main",
        "PUT /notes/{id}": "functions/update.main",
        "DELETE /notes/{id}": "functions/delete.main",
      },
    });

    // Show the API endpoint in the output
  stack.addOutputs({ //printing URL of our API as an output by calling this, also exposing API
    //publicly so we can refer to it in other stacks
    ApiEndpoint: api.url, 
  });

  // Return the API resource
  return {
    api,
  };
}