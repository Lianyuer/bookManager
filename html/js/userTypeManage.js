function search(name) {
  $.ajax({
    url:
      "http://localhost:3000/userType/userType_selectByTypeName?typename=" +
      name,
    success: (res) => {
      let tr = ``;
      res.forEach((element) => {
        tr += `<tr>
                        <td>${element.id}</td>
                        <td>${element.typeName}</td>
                        <td>${element.remark}</td>
                        <td class="behavior">
                          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="edit(${element.id})">编辑</button>
                          <button type="button" class="btn btn-danger" onclick="del(${element.id})">删除</button>
                          <button type="button" class="btn btn-success">权限分配</button>
                        </td>
                      </tr>`;
      });
      $(".tShow").html(tr);
    },
  });
}

// 根据 id 删除用户类型
function del(id) {
  if (confirm("确定要删除吗？")) {
    $.ajax({
      url: "http://localhost:3000/userType/deleteById?id=" + id,
      success: (res) => {
        if (res.status == 1) {
          showAlert(0, res.msg);
          // 表格隐藏
          $("tbody").css("display", "none");
          // 显示加载效果
          $(".spinner-border").css("display", "block");
          setTimeout(() => {
            // 页面刷新
            location.reload();
          }, 1500);
        } else {
          showAlert(1, res.msg);
        }
      },
    });
  }
}

// 全局变量，用于控制是编辑还是新增
var idd;
// 新增用户类型
function add() {
  idd = -1;
  $("#id").val("");
  $("#typeName").val("");
  $("#remark").val("");
}

// 编辑数据回显
function edit(id) {
  idd = id;
  $.ajax({
    url: "http://localhost:3000/usertype/selectById?id=" + idd,
    success: (res) => {
      // console.log(res, "edit");
      $("#typeName").val(res[0].typeName);
      $("#remark").val(res[0].remark);
    },
  });
}

// 提交数据
function submit() {
  var obj = new Object();
  obj.id = $("#id").val();
  obj.typeName = $("#typeName").val();
  obj.remark = $("#remark").val();
  // console.log(obj);
  $.ajax({
    url:
      "http://localhost:3000/userType/userType_addAndEdit?id=" +
      idd +
      "&usertype=" +
      JSON.stringify(obj),
    success: (res) => {
      if (res.status == 0) {
        showAlert(0, res.msg);
        // 表格隐藏
        $("tbody").css("display", "none");
        // 显示加载效果
        $(".spinner-border").css("display", "block");
        setTimeout(() => {
          // 页面刷新
          location.reload();
        }, 1500);
      } else {
        showAlert(1, res.msg);
      }
    },
  });
}
