const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { root } = require('../../lib/helpers');

const appPath = root('tester', 'src', 'client', 'app');
const globalscss = [
  root('tester', 'src', 'client', 'styles.scss')
];

module.exports = {
  entry: {
    'polyfills': root('tester', 'src', 'client', 'polyfills.ts'),
    'vendor': root('tester', 'src', 'client', 'vendor.ts'),
    'app': [
      root('tester', 'src', 'client', 'main.ts')
    ],
    'styles': root('tester', 'src', 'client', 'styles.ts')
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
        exclude: [/node_modules/, globalscss], // exclude scoped styles
        use: ['raw-loader', 'sass-loader']
      },
      {
        /* Global scss */
        test: /\.scss$/,
        exclude: appPath, // exclude scoped styles
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader?sourceMap', "sass-loader"]
          }
        )
      }
    ]
  },

  plugins: [

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('tester', 'src', 'client'), 
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new AngularCompilerPlugin({
      tsConfigPath: root('tester', 'src', 'client', 'tsconfig.client.json'),
      entryModule: root('tester', 'src', 'client', 'app', 'app.module#AppModule')
    }),

    new HtmlWebpackPlugin({
      template: root('tester', 'src', 'client', 'index.html')
    })
  ]
};