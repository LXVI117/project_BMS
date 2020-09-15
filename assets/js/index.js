$(function () {
  //点击退出操作
  $("#logoutBtn").click(function (e) {
    layer.confirm('确定退出登录?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      localStorage.removeItem("token")
      location.href = '/login.html'
      layer.close(index);
    });
  })

  //获取用户信息
  getUserInfo()

  function getUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      // headers: {
      //   Authorization: localStorage.getItem("token") || ''
      // },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败')
        }
        console.log(res);
        // 渲染用户头像
        renderAvatar(res.data)
      },
      //不论成功还是失败都会调用 complete函数 
      // complete: function (res) {
      //   // 如果请求失败直接跳转回登录界面并清空token
      //   // console.log("执行了complete");
      //   // console.log(res);
      //   if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      //     localStorage.removeItem("token")
      //     location.href = "/login.html"
      //   }
      // }
    })
  }

  function renderAvatar(user) {
    let name = user.nickname || user.username
    $("#welcome").html("欢迎您&nbsp;&nbsp;" + name)
    if (user.user_pic !== null) {
      //如果用户信息里面有pic路径 则设置成此路径
      $(".text-avatar").hide()
      $(".layui-nav-img").attr('src', user.user_pic).show()
    } else {
      $(".layui-nav-img").hide()
      var first = user.nickname[0] || user.username[0]
      $(".text-avatar").html(first.toUpperCase()).show()
    }
  }
})