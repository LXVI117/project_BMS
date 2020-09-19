$(function () {
  // 初始化富文本编辑器
  initEditor();

  //文章类别下拉列表部分
  initCateList();

  function initCateList() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        let htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        layui.form.render();
      },
    });
  }

  //发布文章功能
  // 先定义一个文章状态
  let art_status = "已发布";
  $("#save").on("click", function () {
    art_status = "草稿";
    console.log(art_status);
  });
  $("form").on("submit", function (e) {
    e.preventDefault();
    // 利用formate快速获取表单数据
    let fd = new FormData($(this)[0]);
    // 把文章状态追加到fd中
    fd.append("state", art_status);
    // 把裁剪后的图片转化为	blob二进制,也追加到fd中
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 把得到的blob二进制文件 追加到fd中
        fd.append("cover_img", blob);
        // 发起ajax请求
        publishArtical(fd);
        // 跳转到文章列表页面
        // location.href = "/artical/artical_list.html";

        // fd.forEach(function (val, k) {
        //   console.log(k, val);
        // });
      });
  });
  //********************************* *//
  var q = {
    pagenum: 1,
    pagesize: 10,
    cate_id: "",
    state: "",
  };

  function getArtList() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取文章列表失败");
        }
        console.log(res);
      },
    });
  }
  // ***********************************//
  function publishArtical(fd) {
    $.ajax({
      method: "POST",
      url: "/my/article/add",
      data: fd,
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: function (res) {
        console.log(res);
        layui.layer.msg(res.message);
        getArtList()
      },
    });
  }

  // 1. 初始化图片裁剪器
  var $image = $("#image");
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };
  // 3. 初始化裁剪区域
  $image.cropper(options);
});