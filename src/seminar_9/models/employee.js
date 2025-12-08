import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Employee = sequelize.define(
    "Employee",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            len: [3, 10]
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [3, 10]
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        salary: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        birthYear: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1990
            }
        }
    }
    // ,{tableName: "Employees"}
)

export default Employee;