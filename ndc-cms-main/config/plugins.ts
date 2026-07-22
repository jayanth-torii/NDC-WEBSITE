export default ({ env }: { env: any }) => ({

    upload: {
        config: {
            provider: "aws-s3",
            providerOptions: {
                s3Options: {
                region: env("AWS_REGION"),
                credentials: {
                    accessKeyId: env("AWS_ACCESS_KEY_ID"),
                    secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
                },
                },
                params: {
                    Bucket: env("AWS_S3_BUCKET_NAME"),
                    // ACL: env('AWS_S3_ACL'),
                    // signedUrlExpires: env.int('AWS_SIGNED_URL_EXPIRES', 900),
                },
                baseUrl: env("AWS_CDN_BASE_URL"),
                // prefix: env('AWS_S3_PREFIX', 'uploads/'),
            },
        },
    },
});