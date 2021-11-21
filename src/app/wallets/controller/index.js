const router = require("express").Router();
const service = require("../service");
const { auth } = require("../../../common/middlewares/auth");
// const { checkAction } = require('../../../common/middlewares/check-action');
const { validateWallet } = require("../../../common/models/Wallet");

router.get("/", async (req, res) => {
  return await service.getAll(req, res);
});

router.post("/", [validateWallet], async (req, res) => {
  return await service.createOne(req, res);
});
router.get("/:id/offer", async (req, res) => {
  // return await service.getOne(req, res)
  return await service.getOffer(req, res);
}); //done

router.get("/:id", async (req, res) => {
  return await service.getOne(req, res);
});

router.patch(
  "/:id",
  //   [auth, checkAction(["EDIT_USER"]), validateUser],
  [auth, validateWallet],
  async (req, res) => {
    return await service.updateOne(req, res);
  }
);

module.exports = router;
