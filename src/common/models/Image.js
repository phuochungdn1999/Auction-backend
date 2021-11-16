const Joi = require("joi");
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const { BadRequestError } = require("../errors/http-errors");

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    auctionId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "images",
  }
);

module.exports = {
    Image,
};
