$(function () {
  //点击退出操作
  $("#logoutBtn").click(function (e) {
    layer.confirm('确定退出登录?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
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
      headers: {
        Authorization: localStorage.getItem("token") || ''
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败')
        }
        console.log(res);
        // 渲染用户头像
        renderAvatar(res.data)
      }
    })
  }

  function renderAvatar(user) {
    $("#welcome").html(user.nickname || user.username + '&nbsp;&nbsp;欢迎您')
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