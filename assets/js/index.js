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
    console.log(localStorage.getItem("token"));
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      headers: {
        Authorization: localStorage.getItem("token") || ''
      },
      success: function (res) {
        console.log(res);
      }
    })
  }
})