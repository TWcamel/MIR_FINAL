const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

let resp

module.exports = {
    async handler(ctx, next) {
        let query = ctx.query
        try {
            fs.readFile(`${uploadDir}/data.txt`, (err, data) => {
                if (err) throw err;
                resp = JSON.parse(data);
            })
        } catch (e) {
            ctx.status = e.status || 500;
            ctx.body = e.message
            ctx.app.emit("error", e, ctx);
            throw 'error when try to read data.txt';
        }
        next(
            ctx.body = {
                data: resp,
            }
        )
    },
}
