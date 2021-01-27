module.exports.start = (function (url){
    try {
      const net = require('net')    
          var socket = net.connect(url.split(':')[1], url.split(':')[0], function() {
            for(let i = 0; i < 100; i++)
            {
              socket.write('hi');
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