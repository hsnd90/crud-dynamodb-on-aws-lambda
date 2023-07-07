# crud-dynamodb-on-aws-lambda
 With this repository, you can perform DynamoDB CRUD operations via AWS Lambda.

 For production environment you should add NODE_ENV=production to Lambda Enviroment records.

 You can create Lambda by uploading the dist.zip file in the repository.

 You can use it as a RESTful API.

GetAll ( HttpMethod=GET ) => https://<LAMDA_URL>?tableName=<DYNAMODB_TABLE_NAME>
GetById ( HttpMethod=GET ) => https://<LAMDA_URL>?tableName=<DYNAMODB_TABLE_NAME>&id=<RECORD_ID>
Create ( HttpMethod=POST ) => https://<LAMBDA_URL>?tableName=<DYNAMODB_TABLE_NAME> with Request Body
Update ( HttpMethod=PATCH ) => https://<LAMBDA_URL>?tableName=<DYNAMODB_TABLE_NAME> with Request Body
Remove ( HttpMethod=DELETE ) => https://<LAMBDA_URL>?tableName=<DYNAMODB_TABLE_NAME>&id=<RECORD_ID>
