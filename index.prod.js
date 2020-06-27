const Koa = require('koa')
const Router = require('koa-router')
const glob = require('glob')
const koaStatic = require('koa-static')
const history = require('koa2-history-api-fallback')

const {PORT} = require('./config/server')
const {getRouterPath, log} = require('./utils/framework')

const app = new Koa()
const router = new Router()

process.env.NODE_ENV = 'production'

registerApp()

async function registerApp () {
  app.use(async (ctx, next) => {
    log.info(ctx.url)
    await next()
  })

  try {
    await registerMiddlewares();
    await registerRoutes();
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.use(history({
        htmlAcceptHeaders: ['text/html'],
        index: '/index.html'
    }));
    app.use(koaStatic('vue-dist'));
    app.use(koaStatic('public'));

    app.listen(PORT);

    log.info('Production has been started at port:', PORT);
  } catch (e) {
    log.error(e)
    log.error('Fail to start prod env\n\n')
  }
}

async function registerRoutes () {
  return new Promise((resolve, reject) => {
    glob('actions/**/*.js', (err, files) => {
      if (err) {
        log.error('Fail to read actions file')
        log.error(err)
        reject()
        return
      }

      files.forEach(actionPath => {
        let action = require(`./${actionPath}`)
        if (typeof action.handler !== 'function') {
          log.warn(actionPath, '(ignore warm) action files should includes handler and must be function type!')
          return
        }
        if (!action.routerPath) {
          action.routerPath = getRouterPath(actionPath)
        }
        router.get(action.routerPath, action.handler)
      })

      resolve()
    })
  })
}

async function registerMiddlewares () {
  return new Promise((resolve, reject) => {
    glob('middlewares/**/*.js', (err, files) => {
      if (err) {
        log.error('fail to read middlewares file')
        log.error(err)
        reject()
        return
      }

      files.forEach(middlewarePath => {
        let middleware = require(`./${middlewarePath}`)
        if (typeof middleware !== 'function') {
          return
        }

        router.use(middleware)
      })

      resolve()
    })
  })
}
