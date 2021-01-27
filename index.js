const mainRunner = require('./main/index')


async function UpdateCheck()
{
    setInterval(() => {
        //check for update
    }, 5000);
}
console.log("launched")

UpdateCheck();
mainRunner.run();