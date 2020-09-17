$(function () {
  //根据layui提供的扁担验证 验证用户昵称和邮箱
  let form = layui.form
  form.verify({
    nickname: function (val) {
      if (val.length > 6 || val.length <= 1) {
        return "昵称必须是2-6个字符"
      }
    }
  })
  //初始化个人信息
  initInfo()

  function initInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取信息失败")
        }
        form.val("formUserInfo", res.data)

      }
    })
  }
  //重置个人信息
  $("#resetBtn").on("click", function (e) {
    e.preventDefault()
    initInfo()
  })
  // 提交修改后，更新用户昵称  和邮箱
  $("#modForm").on("submit", function (e) {
    e.preventDefault()
    // console.log($(this).serialize());
    // var xhr = new XMLHttpRequest()
    // xhr.open("POST", "http://ajax.frontend.itheima.net/my/userinfo")
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // xhr.send()
    // xhr.onreadystatechange = function () {
    //   console.log(xhr.responseText);
    // }
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("修改失败")
        }
        initInfo()
        layui.layer.msg("修改信息成功")
        //修改信息成功之后 更新index页面的用户名和头像  调用父页面 的方法
        window.parent.getUserInfo()
      }
    })

  })
})