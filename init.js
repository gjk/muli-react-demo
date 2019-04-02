
//项目初始化代码

let path=require('path');
let fs=require('fs');
let  inquirer = require('inquirer'); 

var prompts = [
            {
                name: 'pName',
                message: 'What is the name of your project?',
                default: 'index'
            },
            {
                name: 'des',
                message: 'the description ?',
                default: 'index'
            },
            {
                name: 'author',
                message: 'the author?',
                default: 'index'
            },
            {
                type: 'confirm',
                name: 'moveon',
                message: 'Continue?'
            }
];


inquirer.prompt(prompts).then(function(answers) {
    
    if (!answers.moveon) {
        return done();
    }
    console.log(answers);
    // 生成文件

    fs.mkdir(path.resolve('./src',`page/${answers.pName}`),function(err){
       if(err){
           return 
       }
       console.log('目录创建成功');
        // 创建 sass image component 文件夹 
        mkdir(path.resolve('./src',`page/${answers.pName}/sass`));
        mkdir(path.resolve('./src',`page/${answers.pName}/component`));
        mkdir(path.resolve('./src',`page/${answers.pName}/img`));
        // 对入口文件进行拷贝
        copy(path.resolve(`reacttemplate/index.js`),path.resolve('./src',`page/${answers.pName}/index.js`))
        copy(path.resolve(`reacttemplate/index.html`),path.resolve('./src',`page/${answers.pName}/index.html`)) 
        //对生成的文件进行编辑
        setTimeout(()=>{
            let date=new Date().toLocaleString();
        let  param=`/*** anthor ${answers.author}
        *** des ${answers.des}
        ** date ${date}
        */\n\r`;
        write(param,path.resolve('./src',`page/${answers.pName}/index.js`));
        },1000)
      
    })
    
})
 function mkdir(path,cb){
     fs.mkdir(path,function(err){
       if(err){
           return 
       }
       if(cb){
           cb();
       }
     })
 }
 
function copy(filename,src) {
   return  fs.createReadStream(filename).pipe(fs.createWriteStream(src));
}
//写入文件
function write(data,file){
    let data1=  fs.readFileSync(file);
    let  newdata=new Buffer(data)+data1;
    fs.writeFileSync(file,newdata);
}

