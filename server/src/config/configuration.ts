export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  session: {
    secret: process.env.SESSION_SECRET,
  },
  jwt: {
    access_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_secret: process.env.REFRESH_TOKEN_SECRET,
  },
});
