const router = require("express").Router();
const service = require("../service");
const { auth } = require("../../../common/middlewares/auth");
const { validateAuction } = require("../../../common/models/Auction");

router.get("/", async (req, res) => {
  return await service.getAll(req, res);
}); //done
router.get("/search/:name", async (req, res) => {
  return await service.search(req, res);
}); //done
router.get("/wallet/:walletId", async (req, res) => {
  return await service.getAuctionByWalletId(req, res);
}); //done
router.get("/top", async (req, res) => {
  return await service.getTopAuction(req, res);
}); //done

router.get("/:id", async (req, res) => {
  // return await service.getOne(req, res)
  return await service.getOne(req, res);
}); //done

router.post("/", [auth], async (req, res) => {
  return await service.createOne(req, res);
}); //done
router.post("/approve/:id", [auth], async (req, res) => {
  return await service.approveAuction(req, res);
}); //done
router.post("/send/:id", [auth], async (req, res) => {
  return await service.confirmSend(req, res);
}); //done
router.post("/receive/:id", [auth], async (req, res) => {
  return await service.confirmReceive(req, res);
}); //done

router.patch("/:id", [auth, validateAuction], async (req, res) => {
  return await service.updateOne(req, res);
}); //done

module.exports = router;
