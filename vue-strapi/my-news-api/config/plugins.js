// module.exports = () => ({});
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  auth: {
    provider: 'jwt',
    config: {
      secret: env('JWT_SECRET'),
      expiresIn: '7d',
    },
  },
    // ...
  });