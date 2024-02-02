const { google } = require("googleapis");
const express = require("express");
const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("API listening on port", port);
});

// Returns contents of A1 cell
app.get("/:spreadsheetId", async (req, res) => {
  const spreadsheetId = req.params.spreadsheetId;
  console.log("spreadsheetId", spreadsheetId);
  const value = await getA1(spreadsheetId);
  let retVal;
  if (value) {
    retVal = { status: "success", data: { value } };
  } else {
    res.status(404);
    retVal = { status: "fail", data: { value } };
  }
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(retVal));
});

async function getA1(spreadsheetId) {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const api = google.sheets({ version: "v4", auth });
  const response = await api.spreadsheets.values.get({
    spreadsheetId,
    range: "A1",
  });
  return response.data.values[0];
}
