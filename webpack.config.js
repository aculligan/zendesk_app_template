const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {devDependencies} = require('./package.json');
const TranslationsPlugin = require('./webpack/translations-plugin');


function settings (env = {}) {

  // this function reads Zendesk Garden npm dependencies from package.json and
  // creates a jsDelivr url
  const zendeskGardenJsDelivrUrl = (function () {
    const pkg = Object.keys(devDependencies).filter(item => item.includes('@zendeskgarden/css'));
    const getPkgName = (url, pkg) => {
      const version = devDependencies[pkg]
        .replace(/^[\^~]/g, '')
        .replace(/\.\d$/, '');
      url = `${url}npm/${pkg}@${version},`;
      return url;
    };
    return pkg.length && pkg.reduce(
      getPkgName,
      'https://cdn.jsdelivr.net/combine/'
    ).slice(0, -1);
  }());

  const externalAssets = {
    css: [
      // add any other CSS links here
      zendeskGardenJsDelivrUrl
    ],
    js: [
      // add any other JS links here
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.1.2/handlebars.min.js',
      // this one is mandatory
      'https://assets.zendesk.com/apps/sdk/2.0/zaf_sdk.js'
    ]
  };

  const config = {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'none' : 'source-map',

    entry: {
      app: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        './src/javascripts/modules/app.js',
        './src/stylesheets/app.scss'
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist/assets')
    },
    externals: {
      handlebars: 'Handlebars',
      jquery: 'jQuery',
      underscore: '_'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' }
        },
        {
          type: 'javascript/auto',
          test: /\.json$/,
          include: path.resolve(__dirname, './src/translations'),
          use: path.resolve(__dirname, './webpack/translations-loader')
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: { url: false }},
            'postcss-loader'
          ]
        },
        {
          test: /\.(handlebars|hd?bs)$/,
          loader: 'handlebars-loader',
          query: {
            extensions: ['handlebars', 'hdbs', 'hbs'],
            runtime: 'handlebars'
          }
        }
      ]
    },
    resolveLoader: {
      modules: ['./webpack/', 'node_modules'],
      extensions: ['.js']
    },
    resolve: {
      modules: ['node_modules', './src/javascripts/lib/', './webpack/'],
      alias: {
        'app_manifest': path.join(__dirname, './src/manifest.json')
      },
      extensions: ['.js']
    },
    plugins: [
      // Empties the dist folder
      new CleanWebpackPlugin(),

      // Copy over static assets
      new CopyWebpackPlugin([
        { from: 'src/manifest.json', to: '../', flatten: true },
        { from: 'src/images/*', to: '.', flatten: true }
      ]),

      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),

      new TranslationsPlugin({
        path: path.resolve(__dirname, './src/translations')
      }),

      new HtmlWebpackPlugin({
        warning: 'AUTOMATICALLY GENERATED FROM ./src/templates/layout.html - DO NOT MODIFY THIS FILE DIRECTLY',
        vendorCss: externalAssets.css.filter(path => !!path),
        vendorJs: externalAssets.js,
        template: './src/templates/layout.html',
        filename: 'index.html'
      })
    ]
  };

  if (env.stats) {
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }));
  }

  return config;
}

module.exports = settings;
