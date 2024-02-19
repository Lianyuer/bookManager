// 全局变量，用于控制是编辑还是新增
var idd;
let data; //全部数据

// 绑定数据
function bindData() {
  $.ajax({
    url: "http://localhost:3000/userType/userType_selectType",
    success: (res) => {
      // console.log(res);
      data = res;
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

// 查询
function search(name) {
  $.ajax({
    url:
      "http://localhost:3000/userType/userType_selectByTypeName?typename=" +
      name,
    success: (res) => {
      if (res.status == 0) {
        let tr = ``;
        res.data.forEach((element) => {
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
      } else {
        let empthImg = `<svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#D9D9D9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA"></path></g></g></svg>`;
        let emptyBox =
          empthImg +
          `<p style=" width:100%; text-align:center;">${res.msg}</p>`;
        // 暂无数据就清空tShow
        $(".tShow").html("");
        $(".emptyBox").html(emptyBox);
      }
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
  // 判空
  if (!$("#typeName").val()) {
    showAlert(2, "用户类型不能为空");
    return;
  }
  // 判断重复
  let flag = data.some((item) => item.typeName == $("#typeName").val());
  if (flag) {
    showAlert(2, "用户类型已存在");
    return;
  }
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
