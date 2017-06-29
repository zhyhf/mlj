//创建服务器
const http = require('http');
const express = require('express');
const qs = require('querystring');
const user = require('./user');
var app = express(); //请求处理函数
http.createServer(app).listen(8080);
/**处理静态资源请求**/
app.use(express.static('public'));
/**处理动态资源请求**/
//处理POST请求主体数据的中间件
app.use((req, res, next)=>{
  if(req.method==='POST'){
    req.on('data', (buf)=>{
    //数据解析是异步的
      //把请求主体数据追加为req.body属性
      req.body = qs.parse(buf.toString())
      next(); //等待请求主体数据异步处理完成再调用后面的路由
    })
  }else { //除了POST请求之外的其它请求，如GET，直接放行
    next();
  }
});

app.post('/user/register', user.register);
app.post('/user/login',user.login);
app.get('/user/showHouse',user.showHouses);
app.get('/user/showHouseByzj',user.showHousesZj);
app.get('/user/showHouseBydj',user.showHousesDj);
app.get('/user/totalPage',user.totalPage);
//推荐房源
app.get('/user/TjHouse',user.TjHouses);
//图表
app.get('/user/rendStat',user.rendStat);
app.get('/user/secondHouseStat',user.secondHouseStat);
//新房源展示
app.get('/user/xfZs',user.xfZs);
//二手房源展示
app.get('/user/sfZs',user.sfZs);
//新房源详情展示
app.get('/user/xfXqy',user.xfXqy);
//二手房源详情展示
app.get('/user/secXqy',user.secXqy);
//搜索
app.get('/user/search',user.search);
//404错误
app.get('/*',user.error);

