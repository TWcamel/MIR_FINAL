const path = require('path');
const fs = require('fs')
const exec = require('child_process').exec;
const uploadDir = path.join(__dirname, '../public/uploads');

let resp

module.exports = {
    async handler(ctx, next) {
        try {
            const myShellScript = exec(`sh ${uploadDir}/exec.sh`);
            await myShellScript.stdout.on('data', data => {
                console.log(data);
                resp = data
                // write by using nodejs is handy to handle JSON format, 
                // run local by python file can less computational effort tho
                fs.writeFile(`${uploadDir}/data.txt`, resp, (err) => {
                    if (err) console.log(err);
                    else console.log('Write operation complete.');
                })
            })
            await myShellScript.stderr.on('data', data => {
                console.error(data);
            });

        } catch (e) {
            ctx.status = e.status || 500;
            ctx.body = e.message
            ctx.app.emit("error", e, ctx);
            throw 'error when try to run python script';
        }
        next(
            ctx.body = {
                data: resp,
            }
        )
    }
}