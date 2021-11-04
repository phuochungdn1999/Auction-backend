const { Wallet } = require("../../../common/models/Wallet");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");
const bcrypt = require("bcrypt");

async function getAll(options) {
  const wallets = await Wallet.findAll({ ...options });
  return {
    wallets,
  };
}
async function getOne(id) {
  const wallet = await Wallet.findOne({
    where: { id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return wallet;
}

async function createOne(body, options) {
  const walelt = await Wallet.create(body);
  return walelt;
}

async function getOneWithOptions(options) {
  const wallet = await Wallet.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    ...options,
  });
  return wallet;
}

async function getCount(options) {
  const itemCount = await Wallet.count(options);
  return itemCount;
}

module.exports = {
  getCount,
  getAll,
  getOne,
  // getOneByIdOrFail,
  // insertAll,
  // search,
  createOne,
  // failIfDuplicated,
  getOneWithOptions,
};
