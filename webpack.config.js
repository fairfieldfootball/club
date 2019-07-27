const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = env => {
  const basePath = `${path.join(__dirname)}/.env`;
  const envPath = `${basePath}.${env}`;
  return merge(
    {
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      plugins: [
        new webpack.DefinePlugin(
          [
            ['NODE_ENV', env === 'prod' ? 'production' : 'development'],
            ...Object.entries(dotenv.config({ path: fs.existsSync(envPath) ? envPath : basePath }).parsed),
          ]
            .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
            .reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: value,
              }),
              { NODE_ENV: env === 'prod' ? 'production' : 'development' }
            )
        ),
      ],
      module: {
        rules: [
          {
            test: /\.(j|t)sx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader?sourceMap=true'],
          },
          {
            test: /favicon\.ico$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
          },
        ],
      },
    },
    require(`./webpack.config.${env}.js`)
  );
};
