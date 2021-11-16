const { Image } = require("../../../common/models/Image");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");

async function getAllByAuctionId(id) {
  const images = await Image.findAll({
    where: { auctionId: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return images;
}

async function createBulk(body) {
  const images = await Image.bulkCreate(body);

  return images;
}

module.exports = {
  getAllByAuctionId,
  createBulk,
};
