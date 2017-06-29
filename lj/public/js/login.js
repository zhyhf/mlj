//请求数据
$("#bt2").click(function () {
  var data = $('#form-login').serialize();
  $.ajax({
    type:'POST',
    url:'/user/login',
    data:data,
    success: function(result){
      if(result.code===200){
        alert('登录成功!');
        sessionStorage['loginUname']=$('[name="uname"]').val();
        sessionStorage['loginUid']=result.uid;
        location.href='index.html';
      }else{
        alert('登录失败！错误原因：'+result.msg);
      }
    }
  });
});
