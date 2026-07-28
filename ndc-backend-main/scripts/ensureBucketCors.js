// One-time (but safely re-runnable) setup: allows browser JS (fetch/XHR) to
// read objects cross-origin from the asset bucket. Needed so the admin
// panel's "Download" button can fetch a PDF as a blob and force a save
// dialog (a plain <a download> is ignored by browsers for cross-origin
// URLs). Safe for a public college website's media (no private data, no
// credentials involved) — mirrors ensureBucketPublicRead.js's approach.
// Run manually if the bucket CORS config is ever reset: node scripts/ensureBucketCors.js
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const { S3Client, PutBucketCorsCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({ region: process.env.AWS_REGION });
const bucket = process.env.AWS_S3_BUCKET_NAME;

const corsConfig = {
  CORSRules: [
    {
      AllowedOrigins: ["*"],
      AllowedMethods: ["GET", "HEAD"],
      AllowedHeaders: ["*"],
      MaxAgeSeconds: 3600,
    },
  ],
};

async function main() {
  console.log("Applying CORS configuration to", bucket);
  await s3.send(new PutBucketCorsCommand({ Bucket: bucket, CORSConfiguration: corsConfig }));
  console.log("CORS configuration applied.");
}

main().catch((err) => {
  console.error("SETUP FAILED:", err.name, err.message);
  process.exit(1);
});
