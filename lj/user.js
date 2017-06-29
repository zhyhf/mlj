const pool =require('./pool');
const fs = require("fs");
module.exports = {
  //注册
  register: (req, res)=> {
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var email = req.body.email;
    pool.getConnection((err, conn)=> {
      conn.query("INSERT INTO lj_user VALUES(NULL,?,?,?)", [uname, upwd, email], (err, result)=> {
        if (result.affectedRows === 1) {
          var data = {code: 200, msg: 'register succ'}
        } else {
          var data = {code: 500, msg: 'sql err'}
        }
        res.json(data);
        conn.release();
      });
    });
  },
  //登录
  login: (req, res)=> {
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    pool.getConnection((err, conn)=> {
      conn.query("SELECT uid FROM lj_user WHERE uname=? AND upwd=?", [uname, upwd], (err, result)=> {
        if (err) {
          var data = {code: 500, msg: 'sql err'};
        } else if (result.length === 0) {
          var data = {code: 400, msg: 'uname or upwd err'}
        } else {
          var data = {code: 200, msg: 'login succ', uid: result[0].uid};
        }
        res.json(data);
        conn.release();
      });
    });
  },

  //浏览房源按默认排序
  showHouses: (req, res)=> {
   var start =(req.query.pageNo-1)*3;
    pool.getConnection((err, conn)=> {
      conn.query("SELECT * FROM lj_house LIMIT "+start+",3", (err, result)=> {
          res.json(result);
          conn.release();
      });
    });
  },
  //浏览房源 按总价排序
  showHousesZj: (req, res)=> {
    var start =(req.query.pageNo-1)*3;
    pool.getConnection((err, conn)=> {
      conn.query("SELECT * FROM lj_house order by hprice LIMIT "+start+",3", (err, result)=> {
        res.json(result);
        conn.release();
      });
    });
  },
//浏览房源 按单价排序
showHousesDj: (req, res)=> {
  var start =(req.query.pageNo-1)*3;
  pool.getConnection((err, conn)=> {
    conn.query("SELECT * FROM lj_house order by hdprice  LIMIT "+start+",3", (err, result)=> {
      res.json(result);
      conn.release();
    });
  });
},
  //总页数获取
  totalPage: (req, res)=> {
    pool.getConnection((err, conn)=> {
      conn.query("SELECT count(hid) FROM lj_house", (err, result)=> {
        //console.log(Math.ceil(result[0]['count(hid)']/3));
        var totalPage = Math.ceil(result[0]['count(hid)']/3);
        res.json({
          page:totalPage
        });
        conn.release();
      });
    });
  },

  //浏览房源按默认排序
  TjHouses: (req, res)=> {
    pool.getConnection((err, conn)=> {
      conn.query("SELECT * FROM tj_lp", (err, result)=> {
        if(err){
          var data={code:500,msg:'sql err'};
        }else if(result.length===0){
          var data ={code:400,msg:'uname or upwd err'}
        }else{
          var data ={code:200,msg:'succ'}
        }
        res.json(result);
        conn.release();
      });
    });
  },
  //租房2017上半年租售图表展示
  rendStat: (req, res)=> {
    var output = [
      {label:'1月',value:90},
      {label:'2月',value:100},
      {label:'3月',value:104},
      {label:'4月',value:120},
      {label:'5月',value:189},
      {label:'6月',value:205}
    ]
    res.json(output);
  },
  //二手房2017上半年销售图表展示
  secondHouseStat: (req, res)=> {
    var output = [
      {label:'1月',value:30},
      {label:'2月',value:40},
      {label:'3月',value:15},
      {label:'4月',value:50},
      {label:'5月',value:40},
      {label:'6月',value:30}
    ]
    res.json(output);
  },
  //新房展示
  xfZs: (req, res)=> {
    pool.getConnection((err, conn)=> {
      conn.query("SELECT lid,lpic FROM x_fzs", (err, result)=> {
        res.json(result);
        conn.release();
      });
    });
  },
  //二手房展示
  sfZs: (req, res)=> {
    pool.getConnection((err, conn)=> {
      conn.query("SELECT sid,spic,sname,sintro,scontent,sbcontent FROM s_fzs", (err, result)=> {
        res.json(result);
        conn.release();
      });
    });
  },

  //新房详情页
  xfXqy:(req, res)=> {
    pool.getConnection((err, conn)=> {
      var lid =req.query.lid;
      conn.query("SELECT lgPic,hname,hprice,hcontent FROM x_fzs where lid="+lid, (err, result)=> {
        res.json(result);
        conn.release();
      });
    });
  },

  //二手房详情页
  secXqy:(req, res)=> {
    pool.getConnection((err, conn)=> {
      console.log(req);
      var sid =req.query.sid;
      console.log(sid);
      conn.query("SELECT sid,sgPic,sname,sprice,scon FROM s_fzs where sid="+sid, (err, result)=> {
        res.json(result);
        conn.release();
      });
    });
  },

  //404
  error:(req,res)=>{
    fs.readFile("public/404.html",function(err,data){
      if(err)throw err;
      res.statusCode = 404;
      res.write(data);
      res.end();
    });
  },
  //search
   search:(req, res)=> {
    pool.getConnection((err, conn)=> {
      conn.query("SELECT lgPic,hname,hprice,hcontent FROM x_fzs where hname ="+req.query.search_text, (err, result)=>{
        res.json(result);
        conn.release();
      });
    });
  }
}