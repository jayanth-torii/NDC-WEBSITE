// Starts a REAL, persistent local MongoDB (via mongodb-memory-server's real
// mongod binary, not Docker) on a fixed port + fixed data directory, so it
// behaves like an actual local dev database: data survives restarts, and it
// listens on the same port MONGO_URI already expects (27017). This is a
// stand-in for a real MongoDB Atlas cluster until one is provisioned.
const { MongoMemoryServer } = require("mongodb-memory-server");
const path = require("path");

const dbPath = path.join(__dirname, "..", ".local-mongo-data");

async function main() {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbPath,
      storageEngine: "wiredTiger",
    },
  });
  console.log("Persistent local MongoDB running at", mongod.getUri());
  console.log("Data directory:", dbPath);
  console.log("Leave this process running. Ctrl+C to stop.");
  // Keep alive
  process.stdin.resume();
}

main().catch((err) => {
  console.error("FAILED TO START LOCAL MONGO:", err);
  process.exit(1);
});
