const httpMocks = require("node-mocks-http");
httpMocks.createResponse({ eventEmitter: require("events").EventEmitter });

/* 
  This function creates a mock http request and returns a promise object that 
  resolve to an error and send object.

  Reference:

  https://github.com/howardabrams/node-mocks-http/issues/159

*/

module.exports = (reqParams, resParams) => {
  let errResolver;
  const error = new Promise(res => (errResolver = res));

  const { req, res } = httpMocks.createMocks(reqParams, resParams);

  let dataResolver;
  const data = new Promise(res => (dataResolver = res));
  res.on("end", () => dataResolver(res._getData()));

  const result = Promise.race([
    Promise.all([error, null]),
    Promise.all([null, data])
  ]);
  return { req, res, err: errResolver, result };
};
