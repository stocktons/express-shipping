"use strict";

const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");
const orderSchema = require("../schemas/orderSchema.json");

const { shipProduct } = require("../shipItApi");

const { BadRequestError } = require("../expressError");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const { productId, name, addr, zip } = req.body;
  const order = { productId, name, addr, zip };
  // or const order = req.body;
  const result = jsonschema.validate(order, orderSchema);
  if (!result.valid) {
    let errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;

