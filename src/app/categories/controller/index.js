const router = require("express").Router();
const service = require("../service");
const { auth } = require("../../../common/middlewares/auth");

router.get("/", async (req, res) => {
  return await service.getAll(req, res);
}); //done

// router.get("/:id", async (req, res) => {
//   // return await service.getOne(req, res)
//   return await service.getOne(req, res);
// }); //done

router.post("/", async (req, res) => {
  console.log("req:  ", req.body);
  return await service.createOne(req, res);
}); //done

// router.patch("/:id", [auth, validateAuction], async (req, res) => {
//   return await service.updateOne(req, res);
// }); //done

module.exports = router;
