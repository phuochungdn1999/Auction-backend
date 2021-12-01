const { Network } = require("../models/Network");
const { Auction } = require("../models/Auction");
const { Wallet } = require("../models/Wallet");
const { Offer } = require("../models/Offer");
const { Image } = require("../models/Image");
const { CategoryAuction } = require("../models/CategoryAuction");
const { Category } = require("../models/Category");

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
    foreignKey: "auctionId",
  });
  Offer.belongsTo(Wallet, {
    as: "wallet",
    foreignKey: "walletId",
  });
  // CategoryAuction.belongsTo(Category, {
  //   as: "category",
  //   foreignKey: "categoryId",
  // });
  // CategoryAuction.belongsTo(Auction, {
  //   as: "auction",
  //   foreignKey: "auctionId",
  // });
  Auction.hasMany(CategoryAuction, {
    as: "category-auction",
    foreignKey: "auctionId",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  Category.hasMany(CategoryAuction, {
    as: "category-auction",
    foreignKey: "categoryId",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  Image.belongsTo(Auction, {
    as: "images",
    foreignKey: "auctionId",
  });
};
