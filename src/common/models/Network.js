const Joi = require("joi");
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const { BadRequestError } = require("../errors/http-errors");

const Network = sequelize.define("network", {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  image: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
});

module.exports = {
  Network,
};
