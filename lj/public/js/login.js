//��������
$("#bt2").click(function () {
  var data = $('#form-login').serialize();
  $.ajax({
    type:'POST',
    url:'/user/login',
    data:data,
    success: function(result){
      if(result.code===200){
        alert('��¼�ɹ�!');
        sessionStorage['loginUname']=$('[name="uname"]').val();
        sessionStorage['loginUid']=result.uid;
        location.href='index.html';
      }else{
        alert('��¼ʧ�ܣ�����ԭ��'+result.msg);
      }
    }
  });
});
