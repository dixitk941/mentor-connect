const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      fs: false, // Set this to false to ignore the fs module
      stream: false,
      zlib: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
