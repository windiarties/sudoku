const restify = require('restify')
const pg = require('pg')
const DatabaseConnection = require('./Config/dbp.config.json')
const middleware = require("restify-cors-middleware")
const cron = require('node-cron')
const dt = require('./DataLayer/dt')

var pool = new pg.Pool(DatabaseConnection.config);
pool.connect(function (err) {
    if (err) {
        console.log("not able to get connection " + err);
        process.exit()
    } else {
        console.log('[DATABASE] connected')
        const server = restify.createServer()
        const port = process.env.PORT || 3001
        const cors = middleware({
            origins: ['*'],
            allowHeaders: ['authorization'] 
        });

        server.pre(cors.preflight)
        server.use(cors.actual)
        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser({ mapParams: false }));

        require('./Routes/routes')(server)

        server.listen(port, () => { //memastikan servver aktif 
            console.log('[SERVER] running at port '+port) // memastikan udah jalan
        })
        cron.schedule('0 00 * * *', () => {
            console.log('running a task every minute');
            dt.changeisLockedAll('0 ')
        });
    }
})