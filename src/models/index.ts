import { join } from "path";

const Sequelize = require("sequelize");
const sequelize = new Sequelize("sqlite:" + join(__dirname, "../../db.sqlite"));

class Email extends Sequelize.Model {}

Email.init(
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
  },
  { sequelize }
);

export { Email, sequelize };
