const express = require("express");
const path = require("path");
const products = require("./public/ice-creams/products.json");
const reviews = require("./public/ice-creams/reviews.json");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.send(
    "Backend for frostbite ice cream shop... </br> /api/products for all products. <br> /api/reviews/:key for reviews bassed on the product's key. </br> /ice-creams/images/{ product_key }.png for images."
  )
);

app.get("/api/products", (req, res) => {
  res.json({ products });
});

app.get("/api/reviews/:key", (req, res) => {
  const key = req.params.key;
  filteredReviews = reviews.filter((review) => review.key === key);
  res.json({ reviews: filteredReviews });
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
