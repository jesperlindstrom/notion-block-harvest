require("dotenv").config();

module.exports = {
  env: {
    HARVEST_ACCESS_TOKEN: process.env.HARVEST_ACCESS_TOKEN,
    HARVEST_ACCOUNT_ID: process.env.HARVEST_ACCOUNT_ID,
  },
};
