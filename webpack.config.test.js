const glob=require('glob');
const path=require('path');
const srcRoot = '/src';
const distRoot='/web';
const HtmlWebpackPlugin= require('html-webpack-plugin');
function getEntry () {
    let globPath = 'src/page/**/*.js'
    // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    //let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)html'
    let files = glob.sync(globPath)
    let dirname, entries = {},htmlarr=[];
    for (let i = 0; i < files.length; i++) {
      dirname = path.dirname(files[i]);
      let entry=[];
      entry.push(files[i])
      let value=entry;
      let filename=path.parse(files[i]).name;
      let key= path.join(dirname.substring(9),filename);
      entries[key]=value;
    }
    return entries
  }

  function getEntry1 () {
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
    getEntry1().forEach(function(item){
      entry[item]=[path.resolve(srcRoot,'page',item+'.js')];
    })
    return entry;
  }

   function addPluginsHtml(){
    let plugin=[];
    getEntry1().forEach(function(item){
      plugin.push(new  HtmlWebpackPlugin({
         template:path.resolve(srcRoot,'page',item+'.html'),
         filename:path.resolve(distRoot,'html/page',item+'.html'),
         inject:true,
         minify: false
      }))
    })
    return plugin;
   }

  console.log(addEntry());
  console.log(addPluginsHtml())


  module.exports={
    mode:"development"
  }