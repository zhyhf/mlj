//标签切换
$('ul.tabs').on('click','li a', function(e){
  e.preventDefault();
  //切换a的父元素的active
  $(this).parent().addClass('active').siblings('.active').removeClass('active')
  //根据a的href切换中央的div的active
  var divId = $(this).attr('href');
  $(divId).addClass('active').siblings('.active').removeClass('active');
})
//标签样式的切换

$(".tabs a")
  .css("borderBottom","2px solid #ff00ff")
  .click(function(){
    $(".tabs a")
      .css("border","none")
      .css("borderBottom","1px solid #ff00ff");
    $(this)
      .css("border","2px solid #ff00ff")
      .css("color","yellow")
      .css("borderBottom","none");
  });
//二维码显示
var d1=document.getElementById("d1");
document.getElementById("d2")
    .onclick=function(){
  if(this.textContent=="<<"){
    d1.style.width="0";
    this.textContent=">>";
  }else{
    d1.style.width="64px";
    this.textContent="<<";
  }
}


//功能点3：窗口右下角弹出框
var msg=
  document.getElementById("msg");
window.onload=function(){
  msg.style.bottom=0;
}
function down(){
  msg.style.bottom="-200px";
  setTimeout(function(){
    msg.style.bottom=0;
  },3000);
}
//功能点4：侧边栏弹出框
$(function () { $("[data-toggle='tooltip']").tooltip(); });


//功能点5：分页请求
function loadProduct(pageNo) {

  //请求1 默认排序
  //1:发送ajax请求
  //2:接收服务器返回数据
  $.ajax({
    type: 'GET',
    data: {pageNo: pageNo},
    url: '/user/showhouse',
    success: function (data) {
      console.log(data);
      var html='';
      $.each(data,function(i,tmp){
        html+=`
   <li class="media">
       <div class="media-left">
         <img src="img/${tmp.hpic}" alt=""/>
       </div>
       <div class="media-right">
         <h3>${tmp.hname}
           <span style="color: #e38d13;font-size: 18px;">${tmp.hprice}万</span>
           <span><a href="#">加入收藏</a></span></h3>
         <h4>单价：${tmp.hdprice}/平米</h4>
         <p>${tmp.hcontent}</p>
       </div>
     </li>
     `;
      });
      $('#default ul').html(html);
    }
  });

  //请求2 异步请求二手房源信息数据 按房屋总价排序
  $.ajax({
    type: 'GET',
    data: {pageNo: pageNo},
    url: '/user/showHouseByzj',
    success: function (data) {
      console.log(data);
      var html='';
      for (var i = 0; i < data.length; i++) {
        var tmp = data[i];
        html+=`
   <li class="media">
       <div class="media-left">
         <img src="img/${tmp.hpic}" alt=""/>
       </div>
       <div class="media-right">
         <h3>${tmp.hname}
           <span style="color: #e38d13;font-size: 18px;">${tmp.hprice}万</span>
           <span><a href="#">加入收藏</a></span></h3>
         <h4>单价：${tmp.hdprice}/平米</h4>
         <p>${tmp.hcontent}</p>
       </div>
     </li>
     `;
      }
      $('#zj ul').html(html);
    }
  });

  //请求3 异步请求二手房源信息数据 按房屋单价排序
  $.ajax({
    type: 'GET',
    data: {pageNo: pageNo},
    url: '/user/showHouseBydj',
    success: function (data) {
      console.log(data);
      var html='';
      for (var i = 0; i < data.length; i++) {
        var tmp = data[i];
        html+=`
   <li class="media">
       <div class="media-left">
         <img src="img/${tmp.hpic}" alt=""/>
       </div>
       <div class="media-right">
         <h3>${tmp.hname}
           <span style="color: #e38d13;font-size: 18px;">${tmp.hprice}万</span>
           <span><a href="#">加入收藏</a></span></h3>
         <h4>单价：${tmp.hdprice}/平米</h4>
         <p>${tmp.hcontent}</p>
       </div>
     </li>
     `;
      }
      $('#dj ul').html(html);
    }
  });

  //2:再次发送 ajax请求获取总页数
  //拼接字符串
  $.ajax({
    url:"/user/totalPage",
    success:function(data){
      var pageTotal = data.page;
      //拼接字符串
      var html = "";
      for(var i=1;i<=pageTotal;i++){
        if(i==pageNo){
          html += `
        <li class="active"><a href="#">${i}</a></li>
            `;
        }else{
          html += `
            <li><a href="#">${i}</a></li>
          `;
        }
      }
      $("ol.pagination").html(html);
    }
  });

}
loadProduct(1);
$("ol.pagination").on("click","li a",function(e){
  //1:阻止事件默认行为
  e.preventDefault();
  //2:获取当前按钮页码
  var p = $(this).text();
  //3:发送请求
  loadProduct(p);
});

//功能点6 second_house的在售--canvas文字绘图
var ctx = c1.getContext('2d');
var txt = "热销中的10套南京二手房 先到先得";
ctx.font = '18px SimHei';
ctx.textBaseline = 'top';
ctx.strokeStyle = '#f00';

var w = ctx.measureText(txt).width;
var x = -w;
var y = 0;
setInterval(function(){
  ctx.clearRect(0,0, 500, 50);
  ctx.strokeText(txt, x, y);
  x += 10;
  if(x>=500){
    x = -w;
  }
}, 100);

//功能点7：异步请求二手房2017目前销量数据，绘制SVG统计图
$.ajax({
  type: 'GET',
  url: '/user/secondHouseStat',
  data: {uid: sessionStorage['loginUid']},
  success: function(list){
    //console.log('成功获取到房源统计数据');
    var c = new FusionCharts({
      type: 'doughnut2d',
      renderAt: 'second_charts',
      width: '700',
      height: '500',
      dataSource: {
        "chart": {
          "caption": "南京链家2017上半年度二手房销售情况统计",
          "subcaption":'二手房疯狂降价代售',
          "numberPrefix": "套",
          "paletteColors": "#e4393c,#008000,#f2c500,#f45b00,#8e0000",
          "bgColor": "#8e333",
          "showBorder": "0",
          "use3DLighting": "1",
          "showShadow": "0",
          "enableSmartLabels": "0",
          "startingAngle": "240",
          "showLabels": "1",
          "showPercentValues": "1",
          "showLegend": "1",
          "legendShadow": "0",
          "legendBorderAlpha": "0",
          "captionFontSize": "20",
          "subcaptionFontSize": "14",
          "subcaptionFontBold": "0",
          "toolTipColor": "yellow",
          "toolTipBorderThickness": "0",
          "toolTipBgColor": "#aaa",
          "toolTipBgAlpha": "80",
          "toolTipBorderRadius": "5",
          "toolTipPadding": "5"
        },
        "data":list
      }
    });
    c.render(); //把图表渲染到DOM树上
  }
})







