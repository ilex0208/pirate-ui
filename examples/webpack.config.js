/**
 * webpack 打包配置文件
 * @author ilex
 */

const path = require('path');
const webpack = require('webpack');
const {RayShow, OpenUrlPlugins, browser} = require('ray-plugins');

const __path = 'dist';
// ------------------------------------
// Environment
// ------------------------------------
const __DEV__ = 'development';

// 发布模式
// process.env.NODE_ENV = 'production';

console.log('>创建webpack配置文件.');

const webpackConfig = {
  name: 'amostdemo',
  target: 'web',
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {},
  plugins:[
    new RayShow()
  ]
};

// ------------------------------------
// 入口点
// ------------------------------------
webpackConfig.entry = {
  index: './index.js'
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  path: path.join(__dirname, __path), // 编译到当前目录
  publicPath: '/dist/', // 服务器根路径
  filename: '[name].js' // 编译后的文件名字
};

// ------------------------------------
// Loaders
// ------------------------------------
webpackConfig.module.loaders = [
  { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
  { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap' },
  { test: /\.less$/, loader: 'style-loader!css-loader!less-loader?sourceMap' },
  { test: /\.(woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192&name=[path][name].[ext]' }
];

// 启动发布模式
if (process.env.NODE_ENV === 'production') {
  console.log('>启动发布模式(production).');
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
  module.exports.devtool = '#source-map';
}

if(__DEV__){
  console.log('>启动实时预览插件(development) (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new OpenUrlPlugins({url: 'http://localhost:9000',browser: browser.chrome})
  );
}

module.exports = webpackConfig;
