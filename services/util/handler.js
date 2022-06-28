//creating a handler function that'll be used as a wrapper around our Lambda functions
//it takes Lambda function as argument, then runs the Lambda in a try/catch block
export default function handler(lambda) {
    return async function (event, context) {
      let body, statusCode;
  
      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200; //on success, we JSON.stringify the result and return with this status code
      } catch (e) {
        //prints the full error
        console.error(e); 
        body = { error: e.message };
        statusCode = 500; //error code
      }
  
      // Return HTTP response
      return {
        statusCode,
        body: JSON.stringify(body),
      };
    };
  }