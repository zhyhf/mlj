//页头页尾

/**功能点1： 异步请求页头**/
$('#nav').load('nav.html', function () {
  if(sessionStorage['loginUname']==undefined){
    $('#n1').html(`<span style="color: #122b40">南京</span>&nbsp; <a href="login.html" style="color:#d9534f;font-size: 13px;">登录</a>
    <a href="register.html" style="color:#d9534f;font-size: 13px;">注册</a>`);
  }else{
    $('#n1').html('欢迎来到南京链家: '+sessionStorage['loginUname']+'&nbsp;&nbsp;'
    +`<a href="login.html" style="color:#d9534f;font-size: 13px;">退出登录</a>
   ` );
  }
});

/**功能点2： 异步请求页尾**/
$('#footer').load('footer.html');



//功能点3====首页的footer部分--标签切换

//footer--点击标栏出现下方对应的信息
//console.log($('.affix_1').children);
$('#footer').on('click', '.affix_1 a', function(e){
  e.preventDefault();
  //切换a的父元素的active
  $(this).parent().addClass('active').siblings('.active').removeClass('active')
  //根据a的href切换中央的div的active
  var divId = $(this).attr('href');
  $(divId).addClass('active').siblings('.active').removeClass('active');
});

