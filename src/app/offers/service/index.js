const pagination = require("../../../common/helpers/pagination");
const sequelize = require("../../../database/connection");
const { Auction } = require("../../../common/models/Auction");
const { Wallet } = require("../../../common/models/Wallet");
const { Offer } = require("../../../common/models/Offer");
const repository = require("../repository");
const walletRepository = require("../../wallets/repository");
const auctionRepository = require("../../auctions/repository");
const networkRepository = require("../../networks/repository");
const { Op } = require("sequelize");

async function getOfferByAuctionId(req, res) {
  const list = await repository.getOfferByAuctionId(req.params.id);
  console.log(list);
  return res.status(200).json({ data: list });
}
async function getOfferByWalletId(req, res) {
  const list = await repository.getOfferByWalletId(req.params.id, {
    include: [
      {
        model: Auction,
        as: "auctions",
      },
    ],
  });
  console.log(list);
  return res.status(200).json({ data: list });
}
async function getOfferWithWalletAuction(req, res) {
  const list = await repository.getOfferWithWalletAuction(
    req.params.id,
    req.user.id
  );

  console.log(list);
  return res.status(200).json({ data: list });
}
async function getAll(req, res) {
  let auctions;
  let options;
  const itemCount = await repository.getCount();
  if (req.query.filter === "ALL") {
    console.log("123123")
    auctions = await repository.getAll({
      order: [["updatedAt", "DESC"]]
    });
  } else {
    options = pagination(req.query, itemCount);

    auctions = await repository.getAll({
      order: [["updatedAt", "DESC"]],
      ...options
    });
  }

  return res.status(200).json({ data: auctions, ...options ,itemCount});
}
async function getTopOffer(req, res) {
  const offers = await repository.getTopOffer();

  return res.status(200).json({ data: offers });
}

async function createOne(req, res) {
  const { auctionId, amount } = req.body;
  console.log(req.user);
  console.log(auctionId);
  if (!(await walletRepository.getOne(req.user.id))) {
    return res.status(400).json({ message: "wallet not found" });
  }
  if (!(await networkRepository.getOne(req.user.networkId))) {
    return res.status(400).json({ message: "Network not found" });
  }
  const auction = await auctionRepository.getOne(auctionId);
  if (!auction) {
    return res.status(400).json({ message: "Auction not found" });
  }
  req.body.walletId = req.user.id;

  const data = await repository.getOneByWalletAndAuction(
    req.user.id,
    req.body.auctionId
  );
  if (data) {
    console.log(data.id);
    if (parseFloat(req.body.amount) <= auction.highestBid) {
      return res
        .status(400)
        .json({ message: "The bid is lower than current bid" });
    }
    let obj;
    if (req.body.address) {
      obj = {
        amount: parseFloat(req.body.amount),
        address: req.body.address,
      };
    } else {
      obj = {
        amount: parseFloat(req.body.amount),
      };
    }

    await Offer.update(obj, { where: { id: data.id } });
    let obj2 = {
      addressHighest: req.user.id,
      highestBid: obj.amount,
    };
    await Auction.update(obj2, { where: { id: auction.id } });
    return res.status(201).json({
      message: "Make offer success",
    });
  } else {
    console.log(req.body.amount < auction.highestBid);
    if (
      req.body.amount < auction.reserveBid ||
      req.body.amount < auction.highestBid
    ) {
      return res
        .status(400)
        .json({ message: "The bid is lower than current bid1" });
    } else {
      req.body.walletId = req.user.id;
      const offer = await repository.createOne(req.body);
      let obj3 = {
        addressHighest: req.user.id,
        highestBid: req.body.amount,
        numberOfParticipants: auction.numberOfParticipants + 1,
      };
      await Auction.update(obj3, { where: { id: auction.id } });
      return res.status(201).json({
        message: "Make offer success",
        data: offer,
      });
    }
  }
}

module.exports = {
  getAll,
  // getOne,
  // getProductInWarehouse,
  createOne,
  getOfferByAuctionId,
  getOfferByWalletId,
  getTopOffer,
  getOfferWithWalletAuction,
  // updateOne,
  // search,
  // searchByName
};
