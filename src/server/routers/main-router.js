/**
 * Created by Ysssssss on 20/6/2.
 */


const koaRouter = require('koa-router')

const mainRouter = new koaRouter()

const indexRouter = new koaRouter()

indexRouter.get("(.*)", async ctx => {
    await ctx.render('index')
})

mainRouter.use('/', indexRouter.routes())

module.exports = mainRouter.routes()