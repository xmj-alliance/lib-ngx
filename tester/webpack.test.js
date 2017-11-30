const webpack = require('webpack');
const { root } = require('../lib/helpers');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const appPath = root('tester', 'src', 'client', 'app');
const globalscss = [
  root('tester', 'src', 'client', 'styles.scss')
];

module.exports = {
  devtool: 'inline-source-map',

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
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'null-loader'
      },
      {
        /* Scoped scss */
        test: /\.scss$/,
        exclude: [/node_modules/, globalscss], // exclude global styles
        use: ['raw-loader', 'sass-loader']
      },
      {
        /* Global scss */
        test: /\.scss$/,
        exclude: appPath, // exclude scoped styles
        use: ["null-loader"]
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./src/client'), // location of your src
      {} // a map of your routes
    ),
    new AngularCompilerPlugin({
      tsConfigPath: root('tester', 'src', 'client', 'tsconfig.spec.json'),
      skipCodeGeneration: true, // workaround for issue @angular/angular-cli#8626
      entryModule: root('tester', 'src', 'client', 'app', 'app.module#AppModule')
    })
  ]
}