/*Theory Part 

  Log all the request details which is coming from client side  except login request.
  Using winston library/package/module for extracting request details and store it on server or 
  on database. 
  Also i can use for analyzing if any error happens.
  Log every request so that we can know what user is sending with data to the server.
  Also log errors , so that it is easy to analyze errors.

*/

import fs from "fs";
import winston from "winston";

const fsPromise = fs.promises;
/*promises are object which allow us to create and write
data into files asynchronously, without using callbacks.*/

///Logging and storing data in log.txt using NodeJS traditional fs module approach
async function log(logData) {
  try {
    // fsPromise.writeFile("log.txt", logData) ; Overrite contents & replace older with new
    // fsPromise.appendFile("log.txt", logData) ; don't overrite contents, preserve our log data
    fsPromise.appendFile("log.txt", logData);
  } catch (err) {
    console.log(err);
  }
}

///Logging and storing data in logs.txt using NodeJS winston Library
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  //   console.log(req.body);
  if (!req.url.includes("signin")) {
    const logData = `\n ${new Date().toString()} - ${
      req.url
    } - ${JSON.stringify(req.body)}`;
    // await log(logData);
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
