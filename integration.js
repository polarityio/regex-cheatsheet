'use strict';

const Papa = require('papaparse');
const fs = require('fs');

let Logger;
const cheatLookup = new Map();

function startup(logger) {
  Logger = logger;
  const csvAsString = fs.readFileSync('./data/cheat-sheet.csv', 'utf8');
  let cheatLines = Papa.parse(csvAsString, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    quoteChar: '"'
  });
  if (cheatLines.errors.length > 0) {
    Logger.error({ errors: cheatLines.errors }, 'Encountered Errors Parsing File');
  }
  Logger.info(`Loaded ${cheatLines.data.length} rows`);
  cheatLines.data.forEach((cheat) => {
    cheatLookup.set(cheat.entityString, cheat);
  });
}

function doLookup(entities, options, cb) {
  Logger.debug({ entities: entities, options: options }, 'doLookup');

  let entityResults = [];

  entities.forEach((entity) => {
    if (cheatLookup.has(entity.value)) {
      let cheat = cheatLookup.get(entity.value);
      let summaryTag = "";
      if (cheat.message.length > 20){
          summaryTag = cheat.message.substring(0,19) + "...";
      }
      else{
          summaryTag = cheat.message;
      }
      //Logger.info(cheat.entityString);
      entityResults.push({
        entity: entity,
        displayValue: entity.value,
        data: {
          summary: [`${summaryTag}`],
          details: cheat
        }
      });
    }
  });

  Logger.debug({ entityResults }, 'Results');
  cb(null, entityResults);
}

module.exports = {
  doLookup: doLookup,
  startup: startup
};
