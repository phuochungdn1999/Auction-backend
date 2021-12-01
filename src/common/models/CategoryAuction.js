const Joi = require("joi");
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const { BadRequestError } = require("../errors/http-errors");

const CategoryAuction = sequelize.define(
  "CategoryAuction",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    auctionId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "category-auction",
  }
);

module.exports = {
    CategoryAuction,
};
