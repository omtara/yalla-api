module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["firstName", "lastName"],
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: 'yalla.noreply@gmail.com',
        defaultReplyTo: 'yalla.noreply@gmail.com',
      },
    },
  },
  seo: {
    enabled: true,
  },
  'microsite': {
    enabled: true,
    resolve: './src/plugins/microsite'
  },
});