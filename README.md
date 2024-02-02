# Super Sheets **[WIP]**

This is a service that allows you to run arbitrary JS code against your Google Sheet.

The API lives in the `api/` directory and is deployed to Google Cloud Run.

To give the API access to your sheet, share the sheet with `19029134748-compute@developer.gserviceaccount.com` with either View or Editor access.

The debugging client lives in `client/` directory. All it does is POST the spreadsheet id and the code to the API. Eventually, this can be a more fully featured web-app, or even inside of a browser extension that automatically pulls the spreadsheet id from the URL.

### TODO

- Add ability for top-level `async` by wrapping in IIFE
- Add error reporting
- Simplify interface functions?
- Write full web-app with instructions
- Write Firefox and Chrome browser extensions
- Add more secure sandboxing
