/**
 * Created by Ysssssss on 20/6/2.
 */

const Koa = require('koa')
const path = require('path')
const views = require("koa-views")
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
const mainRouter = require('./src/server/routers/main-router')

const app = new Koa()

app.use(koaStatic(path.resolve(__dirname, './dist')));
app.use(views(__dirname + '/dist'));
app.use(bodyParser());
app.use(logger())


app.use(mainRouter);

app.listen(4321, () => {
    console.log('started')
})