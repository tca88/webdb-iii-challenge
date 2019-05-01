const server = require("./server.js");
const knex = require("knex");

// endpoints here

const port = 5005;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
