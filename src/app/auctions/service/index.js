const pagination = require("../../../common/helpers/pagination");
const sequelize = require("../../../database/connection");
const { isAddress } = require("../../../common/models/Wallet");
const { Auction } = require("../../../common/models/Auction");
const { Network } = require("../../../common/models/Network");
const { Wallet } = require("../../../common/models/Wallet");
const repository = require("../repository");
const netWorkRepository = require("../../networks/repository");
const imageRepository = require("../../images/repository");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");
async function getAll(req, res) {
  const itemCount = await repository.getCount();
  const options = pagination(req.query, itemCount);

  const auctions = await repository.getAll({
    ...options,
  });
  return res.status(200).json({ data: auctions, ...options });
}

async function createOne(req, res) {
  console.log(req.user);
  console.log(req.body);
  const { networkId, id } = req.user;
  const { start, end, stepBid, reserveBid } = req.body;
  if (!(await netWorkRepository.getOne(networkId))) {
    return res.status(400).json({ message: "Network not found" });
  }
  const transaction = await sequelize.transaction();
  if (!isAddress(req.user.id)) {
    return res.status(404).json({ message: "Wallet is not valid" });
  }

  const current = Math.round(new Date().getTime() / 1000);
  if (start <= current) {
    return res
      .status(404)
      .json({ message: "Start time must greater than current" });
  }
  if (end !== 0 && end <= start) {
    return res
      .status(404)
      .json({ message: "End time must greater than start time" });
  }
  if (reserveBid < 0) {
    return res.status(404).json({ message: "Must provide reserve bid" });
  }
  if (stepBid === 0) {
    req.body.stepBid = 1;
  }

  req.body.owner = id;
  req.body.networkId = networkId;
  console.log(req.body);
  let auction = await repository.createOne(req.body, {
    transaction: transaction,
  });
  const imageData = req.body.images.map((data) => {
    return {
      url: data,
      auctionId: auction.id,
    };
  });
  console.log("imagedata", imageData);

  const images = await imageRepository.createBulk(imageData);
  // auctison = { auction, images: { ...images } };
  console.log(auction);
  await transaction.commit();
  return res.status(201).json({
    data: { auction, images },
  });
}

async function getOne(req, res) {
  const auction = await repository.getOne(req.params.id, {
    include: [
      {
        model: Network,
        as: "networks",
        attributes: ["id", "name"],
      },
      {
        model: Wallet,
        as: "wallets",
        attributes: ["id", "name"],
      },
    ],
  });
  if (!auction) return res.status(400).json({ message: "Auction Not Found" });
  return res.status(200).json({ data: auction });
}

async function updateOne(req, res) {
  const { start, end, stepBid } = req.body;
  const auction = await repository.getOneByIdOrFail(req.params.id);
  const current = Math.round(new Date().getTime() / 1000);
  if (start <= current) {
    return res
      .status(404)
      .json({ message: "Start time must greater than current" });
  }
  if (end !== 0 && end <= start) {
    return res
      .status(404)
      .json({ message: "End time must greater than start time" });
  }
  if (stepBid < 0) {
    return res.status(404).json({ message: "Must provide stepBid correct" });
  }

  if (stepBid == 0) {
    req.body.stepBid = 1;
  }
  await Auction.update(req.body, { where: { id: req.params.id } });
  return res.json({ status: 200 });
}

module.exports = {
  getAll,
  getOne,
  // getProductInWarehouse,
  createOne,
  updateOne,
  // insertAll,
  // search,
  // searchByName
};
