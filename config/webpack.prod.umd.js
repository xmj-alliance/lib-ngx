const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const { root } = require('./helpers');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const outputPath = root('dist');
const rootPath = root();

module.exports = {

  entry: {
    'libNgxUMD': root('src', 'index.ts')
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.html']
  },

  resolveLoader: {
    modules: [root('node_modules')]
  },

  devtool: 'source-map',

  output: {
    path: outputPath,
    library: "libNgx",
    libraryTarget: "umd",
    filename: 'libngx.umd.js'
  },

  externals: [
    /^rxjs\//,    //.... any other way? rx.umd.min.js does work?
    /^@angular\//
  ],

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
        use: ['html-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        /* Scoped scss */
        test: /\.scss$/,
        exclude: [/node_modules/], // exclude scoped styles
        use: ['raw-loader', 'sass-loader']
      }
    ]
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
      //entryModule: root('src', 'client', 'app', 'app.module#AppModule')
    })
  ]
};