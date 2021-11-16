const Joi = require("joi");
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const { BadRequestError } = require("../errors/http-errors");

const Offer = sequelize.define(
  "Offer",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    walletId: {
      type: DataTypes.STRING,
    },
    auctionId: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    withdraw: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "INPROCESS",
    },
  },
  {
    tableName: "offers",
  }
);

module.exports = {
  Offer,
};
