const express = require("express");
const controller = require("../controllers/itemController");
const router = express.Router();

router.get("/", controller.getItems);
router.post("/", controller.createItem);
router.put("/:id", controller.updateItem);
router.delete("/:id", controller.deleteItem);

module.exports = router;
