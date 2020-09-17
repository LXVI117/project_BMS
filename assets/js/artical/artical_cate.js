$(function () {
  // 渲染文章列表
  initArtList()

  function initArtList() {
    $.ajax({
      method: 'GET',
      url: "/my/article/cates",
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("获取列表失败")
        }
        //利用模板引擎渲染列表
        let htmlStr = template("tpl-artList", res)
        $("tbody").html(htmlStr)
        layui.layer.msg("获取列表成功")
      }
    })
  }

  //添加图书列表
  $("#add-art").on("click", function () {
    layui.layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px', '250px'],
      content: $("#add-form").html()
    });

  })

  $("body").on("submit", "#add-alert", function (e) {
    e.preventDefault()
    console.log($(this));
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg(res.message)
        initArtList()
      }
    })
  })
})