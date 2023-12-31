const MISSING_TABLENAME = {
  statusCode: 400,
  body: {
    errorMessage: 'Missing TableName',
  },
};

const MISSING_ID = {
  statusCode: 400,
  body: {
    errorMessage: 'Missing id',
  },
};

const MISSING_BODY = {
  statusCode: 400,
  body: {
    errorMessage: 'Missing data',
  },
};

export { MISSING_BODY, MISSING_ID, MISSING_TABLENAME };
