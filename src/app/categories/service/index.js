const pagination = require("../../../common/helpers/pagination");
const sequelize = require("../../../database/connection");
const repository = require("../repository");
const netWorkRepository = require("../../networks/repository");
const BigNumber = require("bignumber.js");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");
async function getAll(req, res) {
  // const itemCount = await repository.getCount();
  // const options = pagination(req.query, itemCount);

  const category = await repository.getAll({
    // ...options,
  });
  return res.status(200).json({ data: category });
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
  const category = await repository.createOne(req.body);
  console.log(category);
  await transaction.commit();
  return res.status(201).json({
    data: { category },
  });
}

module.exports = {
  getAll,
  createOne,
};
