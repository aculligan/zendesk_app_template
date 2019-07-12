Note: Run commands in the root app directory.

### Compile the app for DEV

1) `npm install`
2) `npm run watch` - Creates development environment files in "dist" folder
3) Open a new command line window in the root app directory
4) `zat server -p dist` or `npm run start`- Serves the app to your Zendesk instance with `?zat=true`

### Compile the app for PROD

1) `npm install`
2) `npm run build` - Creates production environment files in "dist" folder
3) `zat validate -p dist` or `npm run validate` - Checks that the app passes the server-side validation
4) `zat package -p dist` or `npm run package` - Creates a zip archive for manual upload

You can also use ZAT to upload and update the app into your Zendesk account

-   `zat create -p dist` or `npm run create` - Uploads the app into Zendesk account
-   `zat update -p dist` or `npm run update` - Updates the app after it has been created in account
