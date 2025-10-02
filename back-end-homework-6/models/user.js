import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING
},{tableName:"users", timestamps: false});

export default User;