export default () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const isProduction = nodeEnv === 'production';

  const requireSecret = (value: string | undefined, name: string): string => {
    if (!value) {
      if (isProduction) {
        throw new Error(
          `Missing required environment variable: ${name}. The server will not start without it.`,
        );
      }

      throw new Error(
        `Missing required environment variable: ${name}. Set it in server/.env.`,
      );
    }

    return value;
  };

  const accessSecret = requireSecret(
    process.env.ACCESS_TOKEN_SECRET,
    'ACCESS_TOKEN_SECRET',
  );
  const refreshSecret = requireSecret(
    process.env.REFRESH_TOKEN_SECRET,
    'REFRESH_TOKEN_SECRET',
  );
  const sessionSecret = requireSecret(
    process.env.SESSION_SECRET,
    'SESSION_SECRET',
  );

  return {
    port: parseInt(process.env.PORT, 10) || 3001,
    nodeEnv,
    session: {
      secret: sessionSecret,
    },
    jwt: {
      access_secret: accessSecret,
      refresh_secret: refreshSecret,
    },
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') || [
        'http://localhost:3000',
        'http://localhost:5173',
      ],
    },
    throttle: {
      ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
      limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 100,
    },
    database: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
    },
  };
};
