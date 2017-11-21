const path = require('path');

const webpack = require('webpack');

const commonConfig = require('./webpack.common.js');
const { root } = require('./helpers');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const outputPath = root('dist', 'app');
const rootPath = root();

module.exports = {

  entry: {
    'libNgxApp': root('src', 'main.ts')
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@ngtools/webpack',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['raw-loader']
      },
      {
        /* Scoped scss */
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: ['raw-loader', 'sass-loader']
      }
    ]
  },

  output: {
    path: outputPath,
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    //new CleanWebpackPlugin([outputPath], {root: rootPath, verbose: false}),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
    //   mangle: {
    //     keep_fnames: true
    //   }
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new AngularCompilerPlugin({
      tsConfigPath: root('tsconfig.json'),
      entryModule: root('src', 'app', 'main#LibNGX')
    })
  ]
};