const azure_eventhub_config = {
  connectionString: process.env.AZURE_EVENTHUB_CONNECTION_STRING,
  partitionKey: process.env.AZURE_EVENTHUB_PARTITION_KEY,
};

module.exports = {
  azure_eventhub_config,
};