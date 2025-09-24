const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const toRadians = (degrees) => (degrees * Math.PI) / 180;

function calculateAngleDegrees(xComponent, yComponent) {
  if (xComponent === 0 && yComponent > 0) {
    return 90;
  }

  if (xComponent === 0 && yComponent < 0) {
    return 270;
  }

  if (xComponent < 0) {
    return (Math.atan(yComponent / xComponent) * 180) / Math.PI + 180;
  }

  if (yComponent < 0 && xComponent >= 0) {
    return (Math.atan(yComponent / xComponent) * 180) / Math.PI + 360;
  }

  return (Math.atan(yComponent / xComponent) * 180) / Math.PI;
}

function isValidNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

app.post("/api/vector-components", (request, response) => {
  const { magnitude, angleDegrees } = request.body || {};

  if (!isValidNumber(magnitude) || magnitude < 0 || !isValidNumber(angleDegrees)) {
    return response.status(400).json({ error: "Provide a non-negative magnitude and a valid angle." });
  }

  const xComponent = Math.cos(toRadians(angleDegrees)) * magnitude;
  const yComponent = Math.sin(toRadians(angleDegrees)) * magnitude;

  return response.json({ xComponent, yComponent });
});

app.post("/api/vector-from-components", (request, response) => {
  const { xComponent, yComponent } = request.body || {};

  if (!isValidNumber(xComponent) || !isValidNumber(yComponent)) {
    return response.status(400).json({ error: "Provide numeric values for both components." });
  }

  const magnitude = Math.sqrt(xComponent ** 2 + yComponent ** 2);
  const angleDegrees = magnitude === 0 ? 0 : calculateAngleDegrees(xComponent, yComponent);

  return response.json({ magnitude, angleDegrees });
});

app.post("/api/vector-sum", (request, response) => {
  const { vectors } = request.body || {};

  if (!Array.isArray(vectors) || vectors.length === 0) {
    return response.status(400).json({ error: "Submit at least one vector to add." });
  }

  let totalX = 0;
  let totalY = 0;

  for (const vector of vectors) {
    const { magnitude, angleDegrees } = vector || {};

    if (!isValidNumber(magnitude) || magnitude < 0 || !isValidNumber(angleDegrees)) {
      return response
        .status(400)
        .json({ error: "Each vector needs a non-negative magnitude and a valid angle." });
    }

    const xComponent = Math.cos(toRadians(angleDegrees)) * magnitude;
    const yComponent = Math.sin(toRadians(angleDegrees)) * magnitude;

    totalX += xComponent;
    totalY += yComponent;
  }

  const magnitude = Math.sqrt(totalX ** 2 + totalY ** 2);
  const angleDegrees = magnitude === 0 ? 0 : calculateAngleDegrees(totalX, totalY);

  return response.json({ totalX, totalY, magnitude, angleDegrees });
});

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Physics Assistant server running on port ${PORT}`);
});
