import { Sequelize } from "sequelize";

const sequelize = new Sequelize("lesson", "Erik", "LGMAIL1234" , {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;