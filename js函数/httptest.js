var http = require('http');

var server = http.createServer();
var fs=require('fs');
var path=require('path');
var query=require('./querys.js');
var del=require('./deletes.js');
server.on('request',function (request,response){
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    var url=request.url;
    if(url==='/'){
        //query.getAllPersonArray().then(result => {
            //var array=[];
            /*
            console.log(result.toString());
            response.end(result.toString());
            var jsonObj=JSON.parse(result.toString());
            console.log(jsonObj[3].Record.name);
            */
           
            //response.end(result.toString());
        //});
        
        query.queryByKey('CAR0').then(result =>{
            console.log(result);
        })
        //var str=query.getAllPerson();
        //console.log(str);
    }else if(url==='/queryall'){
        query.getAllPersonArray().then(result => {
            //var array=[];
            console.log(result.toString());
            response.end(result.toString());
            var jsonObj=JSON.parse(result.toString());
            console.log(jsonObj[3].Record.name);
            
            //response.end(result.toString());
        });
    }else if(url==='/add'){
        fs.readFile(path.join(__dirname,''))
    }
    else if(url==='/login'){
        response.end('hello,login\n');
    }else if(url==='/delete'){
        

    }else{
        response.end('404 not found\n');
    }
   // response.end();
});

server.listen(3000,function(){
    console.log('server is listening at port 3000');
});