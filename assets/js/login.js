$(function () {
  //发起ajax之前预处理 url 
  $.ajaxPrefilter(function (options) {
    // Modify options, control originalOptions, store jqXHR, etc 
    // console.log(options.url);
    options.url = "http://ajax.frontend.itheima.net" + options.url
  });
  //登录注册切换功能
  $('#goReg').on('click', function () {
    $(this).parents('.login').hide().siblings('.reg').show();
  })
  $('#goLogin').on('click', function () {
    $(this).parents('.reg').hide().siblings('.login').show();
  })
  //表单验证
  let form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (val) {
      var pwd = $(".reg [name=password]").val()
      if (pwd !== val) {
        return '两次密码不一致，请重新输入'
      }
    }
  })
  //注册账号

  $('#reg_form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $("#reg_form [name=username]").val(),
        password: $("#reg_form [name=password]").val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message + ",请登录")
        $("#goLogin").click()
      }
    })
  })

  //登录账号
  $(".login").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(".login").serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        localStorage.setItem("token", res.token)
        layer.msg(res.message)
        location.href = '/index.html'
      }
    })
  })

})

// $(function () {
//   console.log(123);
// })