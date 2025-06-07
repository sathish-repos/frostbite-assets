const express = require("express");
const path = require("path");
const cors = require("cors");
const vercelAnalytics = require("@vercel/analytics");

const products = require("./public/ice-creams/products.json");
const reviews = require("./public/ice-creams/reviews.json");

const app = express();

vercelAnalytics.inject();

// Allow only a specific domain
const allowedDomains = [
  "https://frostbite-flax.vercel.app",
  "http://localhost:4200",
];

const corsOptions = {
  origin: allowedDomains,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.send(
    ` 
    <head>
      <link rel="icon" type="image/x-icon" href="/favicon.png" />
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
          color: #222;
          margin: 0;
          padding: 0;
          min-height: 100vh; 
        }
        .container {
          max-width: 600px;
          margin: 60px auto;
          background: rgba(255,255,255,0.95);
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(44,62,80,0.12);
          padding: 36px 32px 28px 32px;
        }
        h1 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 18px;
          letter-spacing: 1px;
          color: #6a11cb;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 18px 0;
        }
        a {
          display: inline-block;
          padding: 10px 22px;
          background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          transition: background 0.2s, transform 0.2s;
          box-shadow: 0 2px 8px rgba(106,17,203,0.08);
        }
        a:hover {
          background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
          transform: translateY(-2px) scale(1.04);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🍦 Frostbite Ice Cream Shop API</h1>
        <ul>
          <li>
            <a href="/api/products">/api/products</a>
            <span style="margin-left:10px;color:#555;">- All products</span>
          </li>
          <li>
            <a href="/api/reviews/0_hd">/api/reviews/:product_key</a>
            <span style="margin-left:10px;color:#555;">- Reviews by product key</span>
          </li>
          <li>
            <a href="/ice-creams/images/0_hd.png">/ice-creams/images/{product_key}.png</a>
            <span style="margin-left:10px;color:#555;">- Product images</span>
          </li>
        </ul>
      </div>
    </body>
    `
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
