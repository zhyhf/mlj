//���ܵ�7 �·�����ҳ����
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
       <h4>����${tmp.hprice}Ԫ/ƽ</h4>
       <span>${tmp.hcontent}</span>
       <p>10101688 ת 85139 ~</p>
     </div>
     `;
    }
    $('#show_House div.searchHouse').html(html);
  }
});