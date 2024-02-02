const { google } = require("googleapis");
const express = require("express");
const app = express();

// TODO: (justinpchang) Replace with secure sandbox
const { VM } = require("vm2");

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("API listening on port", port);
});

// Returns contents of A1 cell
app.get("/:spreadsheetId", async (req, res) => {
  const spreadsheetId = req.params.spreadsheetId;
  const vm = new VM({
    sandbox: {
      send: (data) => {
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(data));
      },
      getA1: async function () {
        const auth = await google.auth.getClient({
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        const api = google.sheets({ version: "v4", auth });
        const response = await api.spreadsheets.values.get({
          spreadsheetId,
          range: "A1",
        });
        return response.data.values[0];
      },
    },
  });
  vm.run("getA1().then(send);");
});
