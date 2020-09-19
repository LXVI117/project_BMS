$(function () {
  //获取文章列表
  var q = {
    pagenum: 2,
    pagesize: 2,
    cate_id: "",
    state: "",
  };
  getArtList();

  function getArtList() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取文章列表失败");
        }
        let artListHtml = template("tpl-artList", res);
        $("tbody").html(artListHtml);
        // let cateSele = template("tpl-cateSele", res);
        // console.log(cateSele);
        // $("#cate-sele").html(cateSele);
        // layui.form.render();
        //渲染分页
        renderPage(res.total)
      },
    });
  }
  //定义时间过滤函数
  template.defaults.imports.filterTime = function (data) {
    let dt = new Date(data);
    let y = dt.getFullYear();
    let m = padZero(dt.getMonth() + 1);
    let d = padZero(dt.getDate());
    let hh = padZero(dt.getHours());
    let mm = padZero(dt.getMinutes());
    let ss = padZero(dt.getSeconds());
    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };
  //定义补零函数
  function padZero(val) {
    return val < 10 ? "0" + val : val;
  }

  // 渲染分类列表
  initCate();

  function initCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取分类数据失败！");
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template("tpl-cateSele", res);
        $("[name=cate_id]").html(htmlStr);
        // 通过 layui 重新渲染表单区域的UI结构
        layui.form.render();
      },
    });
  }
  //筛选功能
  $("#cate-form").on("submit", function (e) {
    e.preventDefault();
    // console.log($("[name=cate_id]")[0]);
    let id = $("[name=cate_id]").val();
    let status = $("[name=state]").val();
    q.cate_id = id;
    q.state = status;
    getArtList();
  });

  //删除功能  
  //删除到最后一个的时候留一个bug

  $("body").on("click", "#delBtn", function () {
    console.log($(this).attr("data-id"));
    let id = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/my/article/delete/" + id,
      data: {
        id: id
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg(res.message);
        getArtList();
      },
    });
  });
  //分页
  function renderPage(total) {
    var laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
      elem: "pagebox", //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      //触发jump回调的条件 1.点击页码 2/调用getArtList();
      jump: function (obj, first) {
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        // 由调用getArtList() 引起jump会导致死循环，让只有点击的时候调用
        if (!first) {
          getArtList();
        }
      }
    });
  };
});