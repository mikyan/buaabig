var qstring = require('querystring')
var formidable = require('formidable')
var config = require('../config')
var path = require('path')
var fs = require('fs')
var chainquery = require('../querys')
var chainAdd = require('../adds.js')
var chainDelete = require('../deletes.js')
var chainChange = require('../changes')
var ckey = ''

var key = 4;
exports.showIndex = function (req, res) {
  chainquery.getAllPersonArray().then(result => {
    //var array=[];
    console.log(result.toString());
    var jsonObj = JSON.parse(result.toString());
    res.render('index', {
      title: '首页',
      musicList: jsonObj
    })

  });

  fs.readFile('keyNum', function (err, data) {
    if (err) {
      return console.error(err);
    }
    key = parseInt(data.toString());
  });

}

exports.showAdd = function (req, res) {
  res.render('add', {
    title: '添加个人信息'
  })
}

exports.doAdd = function (req, res) {
  // 表单post提交的时候，没有enctype的情况下，可以使用下面这种方式来接收和处理post提交的数据
  // var data = ''
  // req.on('data',function (chunk) {
  //   data += chunk
  // })
  // req.on('end',function () {
  //   var postBody = qstring.parse(data)
  //   console.log(postBody)
  //   res.end(JSON.stringify(postBody))
  // })

  // 如果要处理有文件的表单，那么可以使用社区提供的一个包：formidable
  var form = new formidable.IncomingForm()
  form.uploadDir = config.uploadPath
  form.keepExtensions = true
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.end(err.message)
    }
    /*var title = fields.title
    var singer = fields.singer
    var music = path.basename(files.music.path)
    var poster = path.basename(files.poster.path)
    var id = 0
    */
    var name = fields.name;
    var id = fields.id;
    var phone = fields.phone;
    var email = fields.email;
    var address = fields.address;

    chainquery.getAllPersonArray().then(result => {
      //var array=[];
      console.log(result.toString());
      var jsonObj = JSON.parse(result.toString());
      // console.log("执行了\n");
      /*
      jsonObj.forEach(function(item){
        console.log("执行了\n");
        if (parseInt(item.Key.sunstring(3)) > key) {

          key = parseInt(item.Key.sunstring(3));
        }
      })
      */

    });

    key = key + 1;
    chainAdd.addPerson("CAR" + key, name, id, phone, email, address);
    fs.writeFile('keyNum', key, function (err) {
      if (err) {
        return console.error(err);
      }

    });
    res.writeHead(302, {
      'Location': 'http://119.28.235.250:3000'
    })
    res.end()
  })

}

exports.showEdit = function (req, res) {
  ckey = req.query.key

  // 根据 id 查询出该id在数组中对应的项
  chainquery.queryByKey(ckey).then(result => {
    //var array=[];
    var person = JSON.parse(result.toString());
    console.log(person.toString());
    res.render('edit', {
      title: '编辑个人信息',
      person: person,
      Key: ckey
    })
  });

}

exports.doEdit = function (req, res) {
  var form = new formidable.IncomingForm()
  form.uploadDir = config.uploadPath
  form.keepExtensions = true
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.end(err.message)
    }

    var name = fields.name;
    var id = fields.id;
    var phone = fields.phone;
    var email = fields.email;
    var address = fields.address;

    chainAdd.addPerson(ckey, name, id, phone, email, address);


    res.writeHead(302, {
      'Location': 'http://119.28.235.250:3000'
    })
    res.end()
  })

}


// 如何获取和解析get请求提价的查询字符串中参数 url模块的parse方法的第二个参数
// 如何从数组中删除一个元素  splice
exports.doRemove = function (req, res) {
  // 获取查询字符串中的 id
  var key = req.query.key
  chainDelete.deleteByNumber(key);
  res.writeHead(302, {
    'Location': 'http://119.28.235.250:3000'
  })
  res.end()
}
