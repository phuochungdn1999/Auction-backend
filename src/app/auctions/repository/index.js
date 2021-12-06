const { Auction } = require("../../../common/models/Auction");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");
const Sequelize = require("sequelize");
const client = require("../../../database/esConnection");
const Op = Sequelize.Op;

async function getAll(options) {
  const auctions = await Auction.findAll({ ...options });
  return {
    auctions,
  };
}
async function getTopAuction(options) {
  const auctions = await Auction.findAll({order: [["highestBid", "DESC"]],limit: 12 });
  return {
    auctions,
  };
}
async function searchSQL(name) {
  const auctions = await Auction.findAll({
    where: {
      name: { [Op.like]: `%${name}%` },
    },
    attributes: ["id", "name", "highestBid", "start", "end", "imageLogo"],
  });
  return {
    auctions,
  };
}
async function getAuctionByWalletId(walletId) {
  const auctions = await Auction.findAll({
    where: {
      owner: walletId,
    },
    attributes: [
      "id",
      "name",
      "start",
      "end",
      "highestBid",
      "imageLogo",
      "updatedAt",
    ],
    order: [["updatedAt", "DESC"]],
  });
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
    ...options,
  });
  if (!auction) throw new NotFoundError("Auction not found");
  return auction;
}

async function createOne(body, options) {
  const auction = await Auction.create(body);
  await insertOneToEs(auction);
  return auction;
}

async function insertOneToEs(auction) {
  let bulkBody = [];
  bulkBody.push({
    index: {
      _index: "auction",
      _type: "_doc",
      _id: auction.id,
    },
  });
  bulkBody.push(auction);
  client.bulk({ index: "auction", body: bulkBody });
  return "Insert elasticsearch success";
}

async function search(body) {
  let results = await client.search({
    index: "auction",
    body: body,
  });
  console.log("123123", results.hits.hits);

  const auctions = results.hits.hits.map((o) => ({
    id: o._source.id,
    name: o._source.name,
  }));

  return {
    statusCode: 200,
    data: { auctions: auctions },
    total: auctions.length > 0 ? auctions.length : 0,
  };
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
  search,
  searchSQL,
  getAuctionByWalletId,
  getTopAuction
  // failIfDuplicated,
  // getOneWithOptions,
};
