//功能点7 新房详情页请求
$.ajax({
  type: 'GET',
  url: '/user/xfXqy',
  data:{search_text:sessionStorage['search_text']},
  success: function (data) {
    console.log(data);
    var html='';
    for (var i = 0; i < data.length; i++) {
      var tmp = data[i];
      html+=`
       <div class="img_show">
        <img src="img/${tmp.lgPic}" alt=""/>
       </div>
      <div class="img_content">
       <h2>${tmp.hname}</h2>
       <h4>均价${tmp.hprice}元/平</h4>
       <span>${tmp.hcontent}</span>
       <p>10101688 转 85139 ~</p>
     </div>
     `;
    }
    $('#show_House div.searchHouse').html(html);
  }
});