var elasticsearch = require("elasticsearch");
const { 
  BONSAI_URL
} = require('../common/environments')
var client = new elasticsearch.Client({
  hosts: [BONSAI_URL]
});

module.exports = client;