const Joi = require("joi");
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const { BadRequestError } = require("../errors/http-errors");

const Auction = sequelize.define(
  "Auction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    imageLogo: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    addressHighest: {
      type: DataTypes.STRING(255),
    },
    numberOfParticipants: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    start: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    end: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    highestBid: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    reserveBid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    totalBalance: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    stepBid: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    endAuction: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    onwerApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    buyerApprove: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    networkId: {
      type: DataTypes.INTEGER,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ETH",
    },
  },
  {
    tableName: "auctions",
  }
);

function validateAuction(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().required(),
    networkId: Joi.number().required(),
    start: Joi.number().required(),
    end: Joi.number().optional(),
    stepBid: Joi.number().optional(),
    reserveBid: Joi.number().required(),
    currency: Joi.string().optional(),
  });
  // seek for error
  const { error } = schema.validate(req.body, {
    presence: req.method !== "PATCH" ? "required" : "optional",
    abortEarly: false,
  });
  // response when having error
  if (error) throw new BadRequestError(error.message);
  else next(); // no errors
}

module.exports = {
  Auction,
  validateAuction,
};
