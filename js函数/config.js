var path = require('path')
module.exports = {
  port: 3000,
  host: '172.29.0.13',
  viewPath: path.join(__dirname, 'views'),
  uploadPath: path.join(__dirname, 'uploads')
}
