const repository = require("../repository");
const networkRepository = require("../../networks/repository");
const { Wallet, isAddress } = require("../../../common/models/Wallet");
const sequelize = require("../../../database/connection");
const jwt = require("jsonwebtoken");
const Web3 = require("web3");
const pagination = require("../../../common/helpers/pagination");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");
async function getAll(req, res) {
  const itemCount = await repository.getCount();
  let options = pagination(req.query, itemCount);
  console.log(itemCount);
  console.log(options);
  const wallets = await repository.getAll({ ...options });
  return res.status(200).json({ data: wallets, ...options });
}

async function createOne(req, res) {
  const transaction = await sequelize.transaction();
  const { id, networkId } = req.body;

  if (!isAddress(id)) {
    return res.status(404).json({ message: "Wallet is not valid" });
  }
  req.body.id = String(id).toLocaleLowerCase()

  await networkRepository.getOneByIdOrFail(networkId);
  let wallet = await repository.getOne(id);

  if (!wallet) {
    wallet = await repository.createOne(req.body, {
      transaction: transaction,
    });
  }

  const payload = { id: wallet.id, networkId: networkId };
  const token = await jwt.sign(payload, process.env.JWT_KEY);

  await transaction.commit();
  return res.status(201).json({
    data: wallet,
    token: token,
  });
}

async function getOne(req, res) {
  const wallet = await repository.getOneWithOptions({
    where: { id: req.params.id },
  });
  if (!wallet) {
    return res.status(404).json({ message: "Wallet not found" });
  }
  return res.status(200).json({ data: wallet });
}

async function updateOne(req, res) {
  if (!Web3.utils.isAddress(req.params.id)) {
    return res.status(404).json({ message: "Wallet is not valid" });
  }

  await Wallet.update(req.body, { where: { id: req.params.id } });
  return res.json({ status: 200 });
}

module.exports = {
  getAll,
  getOne,
  updateOne,
  // insertAll,
  // search,
  createOne,
  // deleteOne,
};
