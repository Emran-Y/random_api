const express = require("express");
const { Random } = require("random-js");
const app = express();
const port = 3001;

app.use(express.json());

const random = new Random();

// Helper function to generate random points
function generateRandomPoints(side, selection, choice, value) {
  const points = [];
  const halfSide = side / 2;

  for (let i = 0; i < selection; i++) {
    const x = random.real(-halfSide, halfSide);
    const y = random.real(-halfSide, halfSide);
    points.push([x, y]);
  }

  return points;
}

// Endpoint for Field Random Points
app.post("/field-random-points", (req, res) => {
  const { side, selection, choice, value } = req.body;

  if (typeof side !== "number" || typeof selection !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input parameters" });
  }

  const points = generateRandomPoints(side, selection, choice, value);
  res.json({
    input_data: { side, selection, choice, value },
    listOfPoints: points,
    success: true,
  });
});

// Endpoint for Excel Random Points
app.post("/excel-random-points", (req, res) => {
  const { side, selection } = req.body;

  if (typeof side !== "number" || typeof selection !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input parameters" });
  }

  const points = generateRandomPoints(side, selection, 0, 0);
  res.json({
    input_data: { side, selection },
    listOfPoints: points,
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Random Graph API listening at http://localhost:${port}`);
});
