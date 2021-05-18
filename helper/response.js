 function compileResponse(message) {
    const body = typeof message === 'string' ? message : JSON.stringify(message);
  
    return {
      "isBase64Encoded": false,
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body,
    };
  }
  
  function HTTPErrorResponse({ status, error }) {
    const statusCode = status || 403;
    const resp = {
      statusCode,
      body: JSON.stringify({ error }),
    };
    return resp;
  }
  
  function errorResponse(statusCode, message) {
    
    return HTTPErrorResponse({
      status: statusCode,
      error: message,
    });
  }
  
  module.exports = {
    compileResponse,
    errorResponse
  };
  