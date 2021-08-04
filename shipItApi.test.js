"use strict";

const { shipProduct, SHIPIT_SHIP_URL } = require("./shipItApi");

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

test("shipProduct", async function () {
  axiosMock.onPost(SHIPIT_SHIP_URL).reply(201, { receipt: { shipId: 1234 } });

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(1234);
});
