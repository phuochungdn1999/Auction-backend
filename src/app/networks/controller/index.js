const router = require("express").Router();
const service = require("../service");
// const { auth } = require('../../../common/middlewares/auth');
// const { checkAction } = require('../../../common/middlewares/check-action');
// const { validateUser } = require('../../../common/models/User')

router.get("/", async (req, res) => {
    return await service.getAll(req, res)
});

router.post("/", [], async (req, res) => {
    return await service.createOne(req, res)
}); 

router.get("/:id", async (req, res) => {
  return res.json("okela")
});

router.patch(
  "/:id",
//   [auth, checkAction(["EDIT_USER"]), validateUser],
  async (req, res) => {
    return res.json("okela")
  }
);

module.exports = router

