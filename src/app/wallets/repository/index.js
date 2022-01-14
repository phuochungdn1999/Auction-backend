const { Wallet } = require("../../../common/models/Wallet");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");
const bcrypt = require("bcrypt");
const { QueryTypes } = require("sequelize");
const sequelize = require("../../../database/connection");

async function getAll(options) {
  const wallets = await Wallet.findAll({ ...options });
  return {
    wallets,
  };
}
async function getAll1() {
  const wallets = await sequelize.query(
    `select wallets.id, wallets.createdAt,auctions.id as auctionId,auctions.numberOfParticipants,auctions.highestBid,auctions.name from wallets left join auctions on wallets.id = auctions.owner   ORDER BY  auctions.updatedAt DESC `,
    { type: QueryTypes.SELECT }

  )
  return wallets;

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

async function getOffer(options) {
  const auctions = await Wallet.findAll({ ...options });
  return {
    auctions,
  };
}

module.exports = {
  getCount,
  getAll,
  getAll1,
  getOne,
  getOffer,
  // getOneByIdOrFail,
  // insertAll,
  // search,
  createOne,
  // failIfDuplicated,
  getOneWithOptions,
};
