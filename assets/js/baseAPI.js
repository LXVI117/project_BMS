$(function () {
  // 在发起ajax之前 给url地址之前补充根路径
  $.ajaxPrefilter(function (options) {
    // Modify options, control originalOptions, store jqXHR, etc 
    options.url = "http://ajax.frontend.itheima.net" + options.url
    if (options.url.indexOf("/my/ !== -1")) {
      options.headers = {
        Authorization: localStorage.getItem("token") || ''
      }

      options.complete = function (res) {
        // console.log("执行了complete");
        //   // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
          localStorage.removeItem("token")
          location.href = "/login.html"
        }
      }
    }

  });


})