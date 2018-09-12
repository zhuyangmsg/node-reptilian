const http = require("http");
const fs = require("fs");
const url = require("url");
const JSDOM = require("jsdom").JSDOM;
const options = {
    hostname: 'www.taobao.com', 
    //path: '/markets/nanzhuang/2017new'
}
httpRequest('https://www.cnblogs.com/tugenhua0707/p/4456300.html',function(data,buffer){
    //https://www.npmjs.com/package/jsdom
    //https://www.npmjs.com/package/gbk 
    //const dom = new JSDOM(innerData);
    const innerData = data.replace(/<[^>]+>/g,"");
    fs.writeFile("1.txt",innerData,function(err){
        if(err) throw error;
        console.log("成功输出");
    })
})
function httpRequest(address,callback){
    let addressUrl = url.parse(address);
    if(addressUrl.protocol=="https"){
        http = require("https");
    }
    const req = http.request({
        hostname: addressUrl.hostname, 
        path: addressUrl.path,
    },res=>{
        console.log("stateCode",res.statusCode);
        console.log("res.header.loaction",res.headers.location);
        if(res.statusCode==200){
            let str = "";
            let arr = [];
            res.on('data',(chunk)=>{
                str+=chunk;
                arr.push(chunk);
            })
            res.on('end',()=>{
                const bufferArr = Buffer.concat(arr);
                callback(str,bufferArr);
            })
        }else if(res.statusCode==301 || res.statusCode==302){
            httpRequest(res.headers.location,callback);
        }
        
    });
    req.on('error',(e)=>{
       console.log(e)
    });
    req.end();
}


