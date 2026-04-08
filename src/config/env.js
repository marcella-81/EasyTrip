import "dotenv/config";

export const env = {
  PORT: process.env.PORT || 3000,
  OPENWEATHER_KEY: process.env.OPENWEATHER_KEY,
};