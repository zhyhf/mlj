//注册--请求数据
$("#bt").click(function () {
  var data =$("#defaultForm").serialize();
  $.ajax({
    type:'POST',
    url:'/user/register',
    data:data,
    success: function (result) {
      if(result.code===200){
        alert('注册成功！3s后跳转到登录页面');
        location.href='login.html';
      }else{
        alert('注册失败！错误消息：'+result.msg);
      }
    }
  });
});
//注册为界面的动态点击背景--泡泡效果
for(var i=0; i<40; i++){
  var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c.setAttribute('r', rn(10,100));//半径
  c.setAttribute('cx', rn(50,1200));//圆心X
  c.setAttribute('cy', rn(70,500));//圆形Y
  c.setAttribute('fill', rc(0,256));//填充色
  c.setAttribute('fill-opacity', Math.random()); //填充透明度
  svg_rg.appendChild(c);

  //为每个圆形添加事件绑定
  c.onclick = function(){
    var that = this;  //保留事件源的引用
    that.onclick = null;  //让圆形只能点一次
    var t = setInterval(function(){
      //修改圆形半径，每次变大5%
      var r = that.getAttribute('r');
      r *= 1.05; //隐式的浮点数解析
      that.setAttribute('r',r);
      //修改圆形透明度，每次减小5%
      var p = that.getAttribute('fill-opacity');
      p *= 0.95;
      that.setAttribute('fill-opacity', p);

      if(p<=0.001){  //已经透明几乎看不见了
        clearInterval(t);
        svg_rg.removeChild(that);//从DOM上删除圆形
      }

    },30);
  }
}
//random number，返回指定范围内的随机整数
function rn(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//random color，返回指定范围内的随机颜色
function rc(min, max) {
  var r = rn(min, max);
  var g = rn(min, max);
  var b = rn(min, max);
  return `rgb(${r}, ${g}, ${b})`;
}
//表单验证
$(document).ready(function() {
  $('#defaultForm').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      uname: {
        message: 'The uname is not valid',
        validators: {
          notEmpty: {
            message: 'The uname is required and can\'t be empty'
          },
          stringLength: {
            min: 6,
            max: 30,
            message: '用户名必须在6-12位之间'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: 'The username can only consist of alphabetical, number, dot and underscore'
          }
        }
      },
      acceptTerms: {
        validators: {
          notEmpty: {
            message: 'You have to accept the terms and policies'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'The email address is required and can\'t be empty'
          },
          emailAddress: {
            message: '输入的不是有效的邮箱地址'
          }
        }
      },


      upwd: {
        validators: {
          notEmpty: {
            message: '密码是必须的，不能为空'
          }
        }
      }
    }
  });
});