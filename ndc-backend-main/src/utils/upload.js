const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({ region: process.env.AWS_REGION });

function keyFor(file) {
  const isPdf = file.mimetype === "application/pdf";
  const prefix = isPdf ? "pdfs/uploads" : "images/uploads";
  const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  return `${prefix}/${Date.now()}-${safeName}`;
}

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => cb(null, keyFor(file)),
  }),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
    cb(null, true);
  },
});

module.exports = { upload };
