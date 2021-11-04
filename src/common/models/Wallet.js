const Joi = require("joi");
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const { BadRequestError } = require("../errors/http-errors");

const Wallet = sequelize.define("wallet", {
  id: {
    type: DataTypes.STRING(255),
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
  permission: {
    type: DataTypes.STRING(255),
    defaultValue: "user",
  },
});
function validateWallet(req, res, next) {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().max(255).optional(),
    image: Joi.string().max(1024).optional(),
    networkId: Joi.string()
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
  Wallet,
  validateWallet,
  // validateUserPermission
};
