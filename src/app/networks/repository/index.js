const { Network } = require("../../../common/models/Network");
const {
  ConflictedError,
  NotFoundError,
} = require("../../../common/errors/http-errors");
const { negate } = require("lodash");

async function getAll(options) {
  const networks = await Network.findAll();
  return {
    networks,
  };
}
async function getOne(id) {
  const network = await Network.findOne({
    where: { id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return network;
}

async function getOneByIdOrFail(id, options) {
  const network = await Network.findOne({ 
    where: { id },
    ...options
  })
  if (!network) throw new NotFoundError('Network not found')
  return network
}


async function failIfDuplicated(condition) {
  const count = await getCount({ where: condition })
  if (count > 0) throw new ConflictedError('Duplicated')
}

async function createOne(body, options) {

  await failIfDuplicated({
    id: body.id,
  })
  const network = await Network.create(body);

  return network;
}

module.exports = {
  // getCount,
  getAll,
  getOne,
  getOneByIdOrFail,
  // insertAll,
  // search,
  createOne,
  // failIfDuplicated,
  // getOneWithOptions,
};
