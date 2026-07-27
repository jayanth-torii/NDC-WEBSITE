// One-time (but safely re-runnable) setup: grants public s3:GetObject on the
// asset bucket so image/pdf URLs work directly in <img>/next/image without
// signing. Safe for a public college website's media (no private data).
// Run manually if the bucket policy is ever reset: node scripts/ensureBucketPublicRead.js
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const { S3Client, PutBucketPolicyCommand } = require("@aws-sdk/client-s3");
const https = require("https");

const s3 = new S3Client({ region: process.env.AWS_REGION });
const bucket = process.env.AWS_S3_BUCKET_NAME;

const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: `arn:aws:s3:::${bucket}/*`,
    },
  ],
};

async function main() {
  console.log("Applying public-read bucket policy to", bucket);
  await s3.send(new PutBucketPolicyCommand({ Bucket: bucket, Policy: JSON.stringify(policy) }));
  console.log("Policy applied.");

  console.log("\nVerifying public read access...");
  const testUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/images/about-ndc/UGC_SM_V31_1024x1018_29d4c12631.jpg`;
  await new Promise((resolve) => {
    https
      .get(testUrl, (res) => {
        console.log("HTTP status:", res.statusCode);
        res.resume();
        res.on("end", resolve);
      })
      .on("error", (err) => {
        console.log("HTTPS GET error:", err.message);
        resolve();
      });
  });
}

main().catch((err) => {
  console.error("SETUP FAILED:", err.name, err.message);
  process.exit(1);
});
