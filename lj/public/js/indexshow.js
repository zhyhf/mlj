//功能点1===
//绘图1：标题文字来回移动效果
var ctx = c2.getContext('2d');
var p4 = new Image();
p4.src = 'img/4.png';
p4.onload = function(){
  var x = 0;
  var xDirection = 1;
  var y = 0;
  setInterval(function(){
    //清除画布内容
    ctx.clearRect(0,0, 1100,200);
    ctx.drawImage(p4, x, y);
    x += 10*xDirection;
    if(x>=1100-p4.width){
      xDirection = -1;
    }else if(x<=0){
      xDirection = 1;
    }
  }, 150)
};



//功能点2：窗口右下角弹出框
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
//功能点3：侧边栏弹出框
$(function () { $("[data-toggle='tooltip']").tooltip(); });


//功能点4：切换搜索框的placeholder
function plhTabSec() {
$('#sb').attr('placeholder','试试输入地铁线、站，在地铁附近找房');
}

function plhTabNew() {
  $('#sb').attr('placeholder','请输入楼盘名称开始找房');
}

function plhTabREC() {
  $('#sb').attr('placeholder','请输入地铁线或地铁站 可找附近的房源');
}
function plhTabXq() {
  $('#sb').attr('placeholder','请输入小区名开始查找');
}

//功能5：左边弹出动画框
window.onload = function(){
  var odiv = document.getElementById('odiv');
  odiv.onmouseover = function(){
    startMover(0);
  }
  odiv.onmouseout = function(){
    startMover(-600);
  }
}
var timer = null;
function startMover(itarget){//速度和目标值
  clearInterval(timer);//执行当前动画同时清除之前的动画
  var odiv = document.getElementById('odiv');
  timer = setInterval(function(){
    var speed = (itarget-odiv.offsetLeft)/10;//缓冲动画的速度参数变化值
    //如果速度是大于0，说明是向右走，那么就向上取整
    speed = speed>0?Math.ceil(speed):Math.floor(speed);
    //Math.floor();向下取整
    if(odiv.offsetLeft == itarget){
      clearInterval(timer);
    }
    else{
      //clientLeft 返回对象的offsetLeft属性值和到当前窗口左边的真实值之间的距离
      odiv.style.left = odiv.offsetLeft+speed+'px';
    }
  },30);
}


//功能点6 新房展示数据请求
$.ajax({
  type: 'GET',
  url: '/user/xfZs',
  success: function (data) {
    var html='';
    for (var i = 0; i < data.length; i++) {
      var tmp = data[i];
      html+=`
    <li>
       <a href="#" id="${tmp.lid}">
       <img src="img/${tmp.lpic}" alt="新房展示" width="300px" class="img-responsive img-rounded">
       </a>
     </li>
     `;
    }
    $('#newhouse ul.show_newhouse').html(html);
  }
});

//点击新房图片--触发跳转到对应的房源详情页
$("#newhouse ul.show_newhouse").on('click','a', function (e) {
  e.preventDefault();
  sessionStorage['lid']=this.id;
  location.href='detail_fy.html';
});


//功能点7 二手房展示数据请求
$.ajax({
  type: 'GET',
  url: '/user/sfZs',
  success: function (data) {
    var html='';
    for (var i = 0; i < data.length; i++) {
      var tmp = data[i];
      html+=`
      <li>
      <a href="#" id="${tmp.sid}">
      <dl>
        <dt><img src="img/${tmp.spic}" alt="二手房展示" width="250px" class="img-responsive img-rounded"></dt>
        <dd class="bold">${tmp.sname}+${tmp.sintro}<br/>${tmp.scontent}</dd>
        <dd>${tmp.sbcontent}</dd>
      </dl>
        </a>
    </li>
     `;
    }
    $('#second-house .show_secondhouse').html(html);
  }
});

//点击二手房图片--触发跳转到对应的房源详情页
$("#second-house .show_secondhouse").on('click','a', function (e) {
  e.preventDefault();
  console.log(this.id);
  sessionStorage['sid']=this.id;
  location.href='detail_sec.html';
});

//点击搜索按钮获取输入框的值--跳转到对应详情页
$("#search-box .search").on('click','button',function(e){
  e.preventDefault();
  var search_text = $("#sb").val();
  sessionStorage['search_text']=search_text;
  location.href='search.html';
});

