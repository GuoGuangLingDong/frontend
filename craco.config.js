// craco.config.js
const CracoLessPlugin = require('craco-less')
const path = require("path");
const { whenProd } = require('@craco/craco')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  style: {
    postcssOption: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output = {
        ...webpackConfig.output,
      }
      webpackConfig.module = {
        ...webpackConfig.module,
        rules: [
          ...webpackConfig.module.rules,
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
          },
        ],
      }

      return webpackConfig;
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    },
    plugins: [
      ...whenProd(
        () => [
          // https://www.npmjs.com/package/webpack-bundle-analyzer
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false, // build after start analyzer page
            reportFilename: path.resolve(__dirname, `analyzer/index.html`),
          }),
        ],
        [],
      ),
      new NodePolyfillPlugin({
        excludeAliases: ['console'], //have tried with and without this
      })
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    }
  ],
  babel: {
    plugins: ['@babel/plugin-proposal-numeric-separator', "@babel/plugin-proposal-optional-chaining", "@babel/plugin-proposal-nullish-coalescing-operator"],
  }
}