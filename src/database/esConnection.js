var elasticsearch = require("elasticsearch");
// const { 
//   BONSAI_URL
// } = require('../common/environments')
// var client = new elasticsearch.Client({
//   hosts: [BONSAI_URL]
// });
var client = new elasticsearch.Client({
  hosts: ["http://localhost:9200/"]
});

module.exports = client;