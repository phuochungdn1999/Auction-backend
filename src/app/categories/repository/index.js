const { Category } = require("../../../common/models/Category");
const { CategoryAuction } = require("../../../common/models/CategoryAuction");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");
const Sequelize = require("sequelize");
const client = require("../../../database/esConnection");
const Op = Sequelize.Op;

async function getAll(options) {
  const category = await Category.findAll({ ...options });
  return {
    category,
  };
}

async function getOne(id, options) {
  const category = await Category.findOne({
    where: { id },
    ...options,
  });
  return category;
}
async function getFromArray(ids) {
  const categoryArr = [];
  for (const id of ids) {
    const category = await Category.findOne({
      where: { id },
    });
    categoryArr.push(category);
  }

  return categoryArr;
}
async function updateAuctionCategory(categoryIds,auctionId) {
  const categoryAuctionArr = [];
  for (const categoryId of categoryIds) {
    const data =  await CategoryAuction.create({auctionId:auctionId,categoryId:categoryId})
    categoryAuctionArr.push(data)
  }
  return categoryAuctionArr;
}

async function getOneByIdOrFail(id, options) {
  const category = await Category.findOne({
    where: { id },
    ...options,
  });
  if (!category) throw new NotFoundError("category not found");
  return category;
}

async function createOne(body) {
  const category = await Category.create(body);
  return category;
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
  createOne,
  getFromArray,
  updateAuctionCategory
};
