const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  const formData = req.body;

  const errors = {};

  if (!formData.userId || !/^[a-zA-Z0-9]{6,20}$/.test(formData.userId)) {
    errors.userId = "User ID must be between 6 and 20 characters (alphanumeric only).";
  }

  if (!formData.password || formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (!formData.name || !/^[A-Za-z]+$/.test(formData.name)) {
    errors.name = "Name must contain only alphabets.";
  }

  if (!formData.email || formData.email.trim() === "") {
    errors.email = "Email is required.";
  }

  if (!formData.gender || formData.gender === "Select gender") {
    errors.gender = "Gender is required.";
  }

  if (!formData.country || formData.country === "Select country") {
    errors.country = "Country is required.";
  }

  if (!formData.zipCode || formData.zipCode.trim() === "") {
    errors.zipCode = "ZIP Code is required.";
  }
  const languages = Array.isArray(formData.languages) ? formData.languages : [formData.languages];
  if (!languages.some(lang => lang)) {
    errors.languages = "At least one language must be selected.";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    console.log(formData);
    res.send("Form data received successfully!");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
