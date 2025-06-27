import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DB_NAME || "forum_dev",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

export default db;