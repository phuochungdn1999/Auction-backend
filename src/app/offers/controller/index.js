const router = require("express").Router();
const service = require("../service");
const { auth } = require("../../../common/middlewares/auth");

router.get("/", async (req, res) => {
    // return await service.getAll(req, res);
  }); //done
  
  router.get("/:id", async (req, res) => {
    // return await service.getOne(req, res)
    // return await service.getOne(req, res);
  }); //done
  router.get("/auction/:id", async (req, res) => {
    return await service.getOfferByAuctionId(req, res)
    // return await service.getOne(req, res);
  }); //done
  
  router.post("/", [auth], async (req, res) => {
    return await service.createOne(req, res);
  }); //done
  
  router.patch("/:id", [auth], async (req, res) => {
    // return await service.updateOne(req, res);
  }); //done
  
  module.exports = router;
