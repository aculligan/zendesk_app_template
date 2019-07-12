# Zendesk App Template

## Description
This is a customized version of [Zendesk's App Scaffold](https://github.com/zendesk/app_scaffold).

## Getting Started

### Dependencies
-   [Node.js](https://nodejs.org/en/) >= 6.11.5
-   [Ruby](https://www.ruby-lang.org/) >= 2.0.x

### Setup
1.  Clone or fork this repo
2.  Change (`cd`) into the `zendesk_app_template` directory
3.  Run `npm install`

To run your app locally in Zendesk, you need the latest [Zendesk Apps Tools (ZAT)](https://github.com/zendesk/zendesk_apps_tools).


## Compiling

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


## More info

For more information on deploying Zendesk Apps please see the [documentation](https://developer.zendesk.com/apps/docs/developer-guide/deploying).

For more information on publishing Zendesk Apps please see the [documentation](https://developer.zendesk.com/apps/docs/publish/submit_your_app).

For more information on the Zendesk Apps Tools please see the [documentation](https://developer.zendesk.com/apps/docs/developer-guide/zat).


## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
