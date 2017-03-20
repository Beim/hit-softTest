const koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const app = new koa();

const api = require('./api.js');

app.use(serve('./public'));

app.use(bodyParser());

app.use(async (ctx, next) => {
  if (ctx.request.url === '/nextdate') {
    let {year, month, day} = ctx.request.body;
    if (year && month && day) {
      ctx.body = api(year, month, day);
    }
    else {
      ctx.body = {
        flag: 0,
        msg: '参数缺失',
      };
    }
  }
});

app.listen(8080);


