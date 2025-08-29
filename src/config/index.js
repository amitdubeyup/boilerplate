// Centralized configuration (e.g., environment variables)
module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || 'postgresql://neondb_owner:npg_GK1cHmojC9TE@ep-black-art-a1tqxy0x-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  // Add more config as needed
};
