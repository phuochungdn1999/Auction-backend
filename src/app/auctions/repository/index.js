const { Auction } = require("../../../common/models/Auction");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");

async function getAll(options) {
  const auctions = await Auction.findAll({ ...options });
  return {
    auctions,
  };
}

async function getOne(id, options) {
  const auction = await Auction.findOne({
    where: { id },
    ...options,
  });
  return auction;
}

async function getOneByIdOrFail(id, options) {
  const auction = await Auction.findOne({ 
    where: { id },
    ...options
  })
  if (!auction) throw new NotFoundError('Auction not found')
  return auction
}

async function createOne(body, options) {
  const auction = await Auction.create(body);
  return auction;
}

async function getCount(options) {
  const itemCount = await Auction.count(options);
  return itemCount;
}

module.exports = {
  getCount,
  getAll,
  getOne,
  getOneByIdOrFail,
  // insertAll,
  // search,
  createOne,
  // failIfDuplicated,
  // getOneWithOptions,
};
