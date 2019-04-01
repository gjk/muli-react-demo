const path = require('path');
const srcRoot = './src';
const distRoot='./web';
const HtmlWebpackPlugin= require('html-webpack-plugin');
// css分离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
//打包进度
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 压缩css 
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
//压缩 js 
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const glob=require('glob');

function getEntry () {
    let globPath = 'src/page/**/*.js'
    // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    //let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)html'
    let files = glob.sync(globPath)
    let dirname, entries = [];
    for (let i = 0; i < files.length; i++) {
      dirname = path.dirname(files[i]);
      let filename=path.parse(files[i]).name;
      let key= path.join(dirname.substring(9),filename);
      entries.push(key);
    }
    return entries
  }
  function addEntry(){
    let entry={};
    getEntry().forEach(function(item){
        let key=item;
        entry[key]=[path.resolve(srcRoot,'page',item+'.js')];
    })
    return entry;
  }

   function addPluginsHtml(){
    let plugin=[];
    getEntry().forEach(function(item){
      plugin.push(new  HtmlWebpackPlugin({
         template:path.resolve(srcRoot,'page',item+'.html'),
         filename:path.resolve(distRoot,'html/page',item+'.html'),
         inject:true,
         minify: false
      }))
    })
    return plugin;
   }



  console.log(getEntry());


//多入口配置


module.exports = {
    
    mode:"production",
    // 输入配置
    // entry: [
    //   path.resolve(srcRoot,'./page/index/index.js')
    // ],
    entry:addEntry() ,

    // 输出配置
    output: {
        path: path.resolve(__dirname, './web'),
        filename: 'static/script/[name].[chunkhash:8].js',
        publicPath: '/'
    },
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // 这里可以指定一个 publicPath
                      // 默认使用 webpackOptions.output中的publicPath
                      publicPath: '../../../../'
                    },
                  },
                  'css-loader',
                  'sass-loader'
                ],
                include:path.resolve(srcRoot)
            },
            // {
            //     test:/\.scss$/,
            //     use:['style-loader','css-loader','sass-loader'],
            //     include:path.resolve(srcRoot)
            // },
            {
                test:/\.(png|jpg|jpeg)$/,
                use:['url-loader?limit=8192&name=static/images/[name].[hash:8].[ext]'],
                include:path.resolve(srcRoot)
            },
            {
                test:/\.(eot|ttf|woff|woff2|svg)$/,
                use:['url-loader?limit=8192&name=static/images/[name].[hash:8].[ext]'],
                include:path.resolve(srcRoot)
            },
            {
                test:/\.(js|jsx)$/,
                use:[{loader:'babel-loader'}],
                include:path.resolve(srcRoot)
            }
        ]
    },
    plugins:[
        new ProgressBarPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ 
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          })
    ].concat(addPluginsHtml()),
    optimization: {
        minimizer:[
             new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
              }),
              new OptimizeCSSAssetsPlugin({})
            ],
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
    },
    devServer:{
        contentBase:path.join(__dirname,'web'),
        compress:true,
        port:9001
    },
    devtool:"cheap-module-eval-source-map"

};