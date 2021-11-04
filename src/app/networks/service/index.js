const repository = require("../repository");
const { Wallet } = require("../../../common/models/Wallet");
const sequelize = require("../../../database/connection");
const jwt = require("jsonwebtoken");

async function getAll(req, res) {
  const itemCount = await repository.getCount();
  // let options = pagination(req.query, itemCount)
  // options = {
  //   ...options,
  //   include: {
  //     model: Permission,
  //     as: 'permissions',
  //   },
  // }

  // const users = await repository.getAll(options)
  const wallets = await repository.getAll();
  return res.status(200).json({ data: wallets });
}

async function createOne(req, res) {
  const transaction = await sequelize.transaction();
  const { id, networkId } = req.body;

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

module.exports = {
  getAll,
  // getOne,
  // updateOne,
  // insertAll,
  // search,
  createOne,
  // deleteOne,
};
