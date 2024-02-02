const { google } = require("googleapis");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// TODO: (justinpchang) Replace with secure sandbox
const { VM } = require("vm2");

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("API listening on port", port);
});

app.post("/", async (req, res) => {
  const code = req.body.code;
  const spreadsheetId = req.body.spreadsheetId;
  console.log("Running code", code, "on spreadsheet", spreadsheetId);
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const api = google.sheets({ version: "v4", auth });
  const vm = new VM({
    sandbox: {
      send: (data) => {
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(data));
      },
      // Wrapper around Google Sheets API
      // TODO: (justinpchang) Migrate to Proxy + Reflect
      values: {
        get: async function (args) {
          const response = await api.spreadsheets.values.get({
            ...args,
            spreadsheetId,
          });
          return response.data;
        },
        batchGet: async function (args) {
          const response = await api.spreadsheets.values.batchGet({
            ...args,
            spreadsheetId,
          });
          return response.data;
        },
        update: async function (args) {
          const response = await api.spreadsheets.values.update({
            ...args,
            spreadsheetId,
          });
          return response.data;
        },
        batchUpdate: async function (args) {
          const response = await api.spreadsheets.values.batchUpdate({
            ...args,
            spreadsheetId,
          });
          return response.data;
        },
        append: async function (...args) {
          const response = await api.spreadsheets.values.append({
            ...args,
            spreadsheetId,
          });
          return response.data;
        },
      },
      getA1: async function () {
        const response = await api.spreadsheets.values.get({
          spreadsheetId,
          range: "A1",
        });
        return response.data.values[0];
      },
    },
  });
  vm.run(code);
});
