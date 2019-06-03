var http = require('http');

var server = http.createServer();
var fs=require('fs');
var path=require('path');
var query=require('./querys')
server.on('request',function (request,response){
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    var url=request.url;
    if(url==='/'){
        query.getAllPerson().then(result => {
            //console.log(result);
            var str=result;
            response.end(str);
        });
        //var str=query.getAllPerson();
        //console.log(str);
    }else if(url==='/login'){
        response.end('hello,login\n');
    }else{
        response.end('404 not found\n');
    }
   // response.end();
});

server.listen(3000,function(){
    console.log('server is listening at port 3000');
});