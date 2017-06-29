//功能点7 新房详情页请求
$.ajax({
  type: 'GET',
  url: '/user/secXqy',
  data:{sid:sessionStorage['sid']},
  success: function (data) {
    console.log(data);
    var html='';
    for (var i = 0; i < data.length; i++) {
      var tmp = data[i];
      html+=`
       <div class="img_show">
        <img src="img/${tmp.sgPic}" alt=""/>
       </div>
      <div class="img_content">
       <h2>${tmp.sname}</h2>
       <h4>均价${tmp.sprice}元/平</h4>
       <span>${tmp.scon}</span>
       <p>10101688 转 85139 ~</p>
     </div>
     `;
    }
    $('#show_detailHouse div.detailHouse').html(html);
  }
});
