export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  session: {
    secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
  },
  jwt: {
    access_secret: process.env.ACCESS_TOKEN_SECRET || 'fallback-access-secret',
    refresh_secret: process.env.REFRESH_TOKEN_SECRET || 'fallback-refresh-secret',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:5173'],
  },
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
    limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 100,
  },
  database: {
    url: process.env.DATABASE_URL || 'file:./dev.db',
  },
});
