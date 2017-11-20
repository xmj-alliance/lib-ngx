const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { root } = require('./helpers');

module.exports = {
  entry: {
    'libNgx': root('index.ts')
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

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

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('src', 'client'), 
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['libNgx']
    }),

    new AngularCompilerPlugin({
      tsConfigPath: root('tsconfig.json'),
      //entryModule: root('src', 'client', 'app', 'app.module#AppModule')
    })
  ]
};