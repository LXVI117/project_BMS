$(function () {
  // 渲染文章列表
  initArtList()

  function initArtList() {
    $.ajax({
      method: 'GET',
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取列表失败")
        }
        //利用模板引擎渲染列表
        let htmlStr = template("tpl-artList", res)
        $("tbody").html(htmlStr)
      }
    })
  }

  //添加 弹出框
  var addIndex = null
  var layer = layui.layer
  $("#add-art").on("click", function () {
    addIndex = layui.layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px', '250px'],
      content: $("#add-dialog").html()
    });

  })
  // 添加列表
  $("body").on("submit", "#add-form", function (e) {
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
        layui.layer.close(addIndex)
        initArtList()
      }
    })
  })

  //编辑功能
  //点击编辑弹出框
  let editIndex = null
  $("body").on("click", ".btn-edit", function () {
    editIndex = layer.open({
      title: '修改文章分类',
      type: 1,
      area: ['600px', '300px'],
      content: $("#edit-dialog").html()
    });
    // 给弹出框表单附上原先的内容
    let Id = $(this).attr("Id")
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + Id,
      success: function (res) {
        layui.form.val('edit-form', res.data)
      }
    })

  })
  //确认修改功能
  $("body").on("submit", "#edit-form", function (e) {
    e.preventDefault()
    console.log($(this).serialize(), );
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        layer.msg(res.message)
        layer.close(editIndex)
        initArtList()
      }
    })
  })
  //删除功能
  $("body").on("click", "#delBtn", function () {
    let id = $(this).attr("data-id")
    $.ajax({
      method: "GET",
      url: "/my/article/deletecate/" + id,
      data: {
        id: id
      },
      success: function (res) {
        console.log(res);
        initArtList()
        layer.msg(res.message)
      }
    })
  })
})