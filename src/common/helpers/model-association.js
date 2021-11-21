const { Network } = require("../models/Network");
const { Auction } = require("../models/Auction");
const { Wallet } = require("../models/Wallet");
const { Offer } = require("../models/Offer");
const { Image } = require("../models/Image");

module.exports = function () {
  Auction.belongsTo(Network, {
    as: "networks",
    foreignKey: "networkId",
  });

  Auction.belongsTo(Wallet, {
    as: "wallets",
    foreignKey: "owner",
  });
  Offer.belongsTo(Auction, {
    as: "auction",
    foreignKey: "id",
  });
  Image.belongsTo(Auction, {
    as: "images",
    foreignKey: "auctionId",
  });

  Wallet.belongsToMany(Auction, {
    through: Offer,
    as: "auctions",
    foreignKey: "walletId",
    otherKey: "auctionId",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};
