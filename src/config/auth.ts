export default {
  secret: process.env.ACCESS_TOKEN_SECRET || "671ff328a17871b41a862cf83c6c215c",
  expiresIn: "1d",
  refreshSecret: process.env.REFRESH_TOKEN_SECRET || "729bd6c75eaad1aa02cf5fba537d8b7c",
  refreshExpiresIn: "1d",
};