$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  // 上传照片功能
  $("#sendImgBtn").on("click", function (e) {
    $("#file").click()
  })
  $("#file").on("change", function (e) {
    let fileList = e.target.files;
    // console.log($(this) === e.target);
    // console.log(e.target.files);
    if (fileList.length === 0) {
      return layui.layer.msg("请选择图片")
    }
    let file = e.target.files[0]
    // console.log(file)
    let imgURL = URL.createObjectURL(file)
    console.log(imgURL);
    $("#image").cropper('destroy').attr("src", imgURL).cropper(options)
  })

  $("#sure").on("click", function () {

    // 1. 要拿到用户裁剪之后的头像
    var dataURL = $("#image")
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    console.log(dataURL);
    $.ajax({
      method: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("头像更改失败")
        }
        console.log(res);
        layui.layer.msg("头像更换成功")
        window.parent.getUserInfo()
      }
    })

  })
})