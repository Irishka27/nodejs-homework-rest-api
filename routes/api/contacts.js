const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
