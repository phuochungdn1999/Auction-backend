const { Offer } = require("../../../common/models/Offer");
const { Auction } = require("../../../common/models/Auction");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");
const { QueryTypes } = require("sequelize");
const sequelize = require("../../../database/connection");

async function getAll(options) {
  const offers = await Offer.findAll();
  return {
    offers,
  };
}
async function getOne(id) {
  const offer = await Offer.findOne({
    where: { id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return offer;
}
async function getOneByWalletAndAuction(address, auctionId) {
  const offer = await Offer.findOne({
    where: { walletId: address, auctionId: auctionId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return offer;
}
async function getOfferByAuctionId(auctionId) {
  const offer = await Offer.findAll({
    where: { auctionId: auctionId },
    attributes: { exclude: ["updatedAt"] },
    order: [["amount", "DESC"]],
  });
  return offer;
}
async function getOfferByWalletId(walletId, options) {
  const offer = await sequelize.query(
    `select offers.id,offers.walletId,offers.auctionId,offers.amount,offers.withdraw, offers.updatedAt,auctions.name,auctions.imageLogo,auctions.addressHighest,auctions.start,auctions.end from offers inner join auctions on offers.auctionId = auctions.id inner join wallets on offers.walletId = wallets.id where walletId='${walletId}' ORDER BY updatedAt DESC`,
    { type: QueryTypes.SELECT }
  );
  console.log("12123", offer);
  return offer;
}

async function getOneByIdOrFail(id, options) {
  const offer = await Offer.findOne({
    where: { id },
    ...options,
  });
  if (!offer) throw new NotFoundError("Offer not found");
  return offer;
}

async function createOne(body, options) {
  const offer = await Offer.create(body);

  return offer;
}

module.exports = {
  // getCount,
  getAll,
  getOne,
  getOneByIdOrFail,
  getOfferByAuctionId,
  getOfferByWalletId,
  // insertAll,
  // search,
  createOne,
  getOneByWalletAndAuction,
  // failIfDuplicated,
  // getOneWithOptions,
};
