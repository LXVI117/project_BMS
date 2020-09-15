$(function () {
  // 在发起ajax之前 给url地址之前补充根路径
  $.ajaxPrefilter(function (options) {
    // Modify options, control originalOptions, store jqXHR, etc 
    options.url = "http://ajax.frontend.itheima.net" + options.url
  });

})