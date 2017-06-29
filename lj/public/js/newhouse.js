//功能点1：窗口右下角弹出框
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


//功能点2：伸缩二级菜单
var spans=document.querySelectorAll(
  ".tree>li>span"
);
for(var i=0;i<spans.length;i++){
    spans[i].onclick=function(){
        if(this.className=="open")
            this.className="";
        else{
            var othSpan=
              document.querySelector(
                ".tree>li>span.open"
              );
            if(othSpan!==null)
                othSpan.className="";
            this.className="open";
        }
    }
}

//功能点3：侧边栏弹出框
$(function () { $("[data-toggle='tooltip']").tooltip(); });


//功能点4 ：推荐房源请求
$.ajax({
  type: 'GET',
  url: '/user/TjHouse',
  success: function (data) {
    console.log(data);
    var html='';
    for (var i = 0; i < data.length; i++) {
      var tmp = data[i];
      html+=`
         <li>
      <div class="img_xfIntro">
        <img src="img/${tmp.lpic}" class="img-thumbnail">
        <div class="introduct">
          <h2>${tmp.lname}</h2>
          <p>${tmp.addr}</p>
          <p>均价：${tmp.price}元/平米</p>
          <span>${tmp.lx}</span>
        </div>
      </div>
    </li>
     `;
    }
    $('#tuiJian ul').html(html);
  }
});
