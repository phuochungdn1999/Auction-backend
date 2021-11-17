const { Offer } = require("../../../common/models/Offer");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");

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
  // insertAll,
  // search,
  createOne,
  getOneByWalletAndAuction,
  // failIfDuplicated,
  // getOneWithOptions,
};
