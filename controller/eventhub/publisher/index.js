'use strict';

const { EventHubClient } = require('azure-event-hubs');
const event_config = require('./../config').azure_eventhub_config;

const client = EventHubClient.createFromConnectionString(event_config.connectionString);

const sendEventWithJSONPayload = async (jsonPayload) => {
  const finalJSON = { ...jsonPayload };
  finalJSON.partitionKey = event_config.partitionKey;
  const confirmation = await client.send(finalJSON);
  return confirmation;
}

module.exports = {
  sendEventWithJSONPayload
};