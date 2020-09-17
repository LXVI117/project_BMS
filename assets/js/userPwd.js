$(function () {
  //密码表单验证
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: function (value) {
      if (value === $("[name=oldPwd").val()) {
        return "两次密码不能一致";
      }
    },
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "输入的新密码不一样";
      }
    },
  });
  $("#pwdForm").on("submit", function (e) {
    e.preventDefault();
    console.log($("[name=newPwd]").val());
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: {
        oldPwd: $("[name=oldPwd]").val(),
        newPwd: $("[name=newPwd]").val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg(res.message);
        // location.href = "";
      },
    });
  });
});
