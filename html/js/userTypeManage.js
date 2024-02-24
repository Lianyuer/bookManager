// 全局变量，用于控制是编辑还是新增
var idd;
let allData; //全部数据
var searchData = new Array(); // 搜索到的数据

// 绑定数据
function bindData() {
  $.ajax({
    url: "http://localhost:3000/userType/userType_selectType",
    success: (res) => {
      allData = res;
      showData(allData);
      // // 初始化分页
      showLi();
      // // 默认显示第一页
      choosePage(1);
    },
  });
}

// 根据页面不同，展示的数据不同，所以需要单独提出来
function showData(data) {
  $(".tShow").html("");
  let tr = ``;
  data.forEach((element) => {
    console.log(element, "element");
    tr += `<tr>
                <td>${element.id}</td>
                <td>${element.typeName}</td>
                <td>${element.remark}</td>
                <td class="behavior">
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="edit(${element.id})">编辑</button>
                  <button type="button" class="btn btn-danger" onclick="del(${element.id})">删除</button>
                  <a type="button" href="./pagesPower.html?tid=${element.id}" class="btn btn-success">权限分配</a>
                </td>
              </tr>`;
  });
  $(".tShow").html(tr);
}

// 查询
function search(name) {
  $.ajax({
    url:
      "http://localhost:3000/userType/userType_selectByTypeName?typename=" +
      name,
    success: (res) => {
      $("#searchIpt").val(""); // 搜索后清空输入框
      if (res.status == 0) {
        searchData = res.data;
        $(".emptyBox").html("");
        // 根据搜索到的数据展示页号
        showLi();
        // 展示数据
        // showData(searchData);
        document.getElementById(
          "totalCountDom"
        ).textContent = `共${res.data.length}条`;
        // 默认显示第一页
        choosePage(1);
      } else {
        let empthImg = `<svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#D9D9D9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA"></path></g></g></svg>`;
        let emptyBox =
          empthImg +
          `<p style=" width:100%; text-align:center;">${res.msg}</p>`;
        // 暂无数据就清空tShow
        $(".tShow").empty();
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
    url: "http://localhost:3000/usertype/usertype_selectById?id=" + idd,
    success: (res) => {
      console.log(res, "edit");
      $("#id").val(res[0].id);
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
  /**
   * some函数将不会考虑id与currentItemId相同的项，从而确保唯一性检查是针对除了当前编辑项之外的所有项的。
   */
  let currentItemId = parseInt($("#id").val()); // 当前项
  let flag = allData.some(
    (item) => item.id !== currentItemId && item.typeName == $("#typeName").val()
  );
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
