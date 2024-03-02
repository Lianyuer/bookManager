let allData = [];
// let searchData = [];
var parentData = [];
var idd = -1; // 全局变量，判断是编辑还是新增

// 根据页面不同，展示的数据不同，所以需要单独提出来
function showData(data) {
  $(".tShow").html("");
  let tr = "";
  data.forEach((element) => {
    tr += `<tr>
      <td>${element.id}</td>
      <td>${element.pageName}</td>
      <td>${element.pageUrl}</td>
      <td>${element.remark}</td>
      <td>${element.parentName}</td>
      <td>
        <button class="btn btn-info mr-2" data-toggle="modal"
          data-target="#myModal" onclick="edit(${element.id})">编辑</button>
        <button class="btn btn-danger mr-2" onclick="del(${element.id})">删除</button>
      </td>
    </tr>`;
  });
  $(".tShow").html(tr);
}
// 搜索所有页面信息（包含父级）
function search() {
  $.ajax({
    url: "http://localhost:8888/pages/pages_selectAllWithParent",
    success: (res) => {
      allData = res;
      parentData = res.filter((item) => item.pid == 0);
      // 展示数据
      showData(res);
      // 展示页码
      showLi();
      // 默认选择第一页
      choosePage(1);
      showSelect(parentData);
    },
  });
}

// 渲染select
function showSelect(data) {
  let options = `<option value="0" disabled selected>无父级页面</option>`;
  // console.log(data, "parentData");

  data.forEach((element) => {
    options += `<option value="${element.id}">${element.pageName}</option>`;
  });
  $(".selectParent").html(options);
}

// 删除
function del(id) {
  idd = id;
  if (confirm("确定要删除吗？")) {
    $.ajax({
      url: "http://localhost:8888/pages/pages_delById?id=" + idd,
      success: (res) => {
        if (res.status == 0) {
          showAlert(0, res.msg);
          setTimeout(() => {
            location.reload(true);
          }, 1000);
        } else {
          showAlert(1, res.msg);
        }
      },
    });
  }
}

// 新增
function add() {
  id = -1;
  $("#pageName").val("");
  $("#pageUrl").val("");
  $("#remark").val("");
}

// 数据回显
function edit(id) {
  idd = id;
  $.ajax({
    url: "http://localhost:8888/pages/pages_selectById?id=" + idd,
    success: (res) => {
      // console.log(res, "pages_selectById");
      $("#pageName").val(res[0].pageName);
      $("#pageUrl").val(res[0].pageUrl);
      $("#remark").val(res[0].remark);

      // 获取 select 元素
      var select = document.querySelector(".selectParent");

      // // 获取选中 option 的索引
      // var selectedIndex = select.selectedIndex;

      // // 获取选中的 option 元素
      // var selectedOption = select.options[selectedIndex];
      // console.log(selectedOption, "selectedOption");
      // // 获取选中 option 的文本和值
      // var selectedText = selectedOption.text;
      // var selectedValue = selectedOption.value;
      // // 移除选中项的 selected 属性
      // selectedOption.removeAttribute("selected");
      // console.log(selectedValue, "selectedValue");

      // 遍历所有的 option，并设置对应的 selected 属性
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value == res[0].pid) {
          select.options[i].selected = true;
          break; // 找到后退出循环
        }
      }
    },
  });
}

// 提交数据
function submit() {
  let obj = new Object();
  obj.pageName = $("#pageName").val();
  obj.pageUrl = $("#pageUrl").val();
  obj.remark = $("#remark").val();
  // 获取 select 元素
  var select = document.querySelector(".selectParent");
  // 获取选中 option 的索引
  var selectedIndex = select.selectedIndex;

  // 获取选中的 option 元素
  var selectedOption = select.options[selectedIndex];
  console.log(selectedOption);
  // 获取选中 option 的文本和值
  var selectedText = selectedOption.text;
  var selectedValue = selectedOption.value;
  obj.pid = selectedValue;
  $.ajax({
    url:
      "http://localhost:8888/pages/pages_addAndEdit?id=" +
      idd +
      "&pages=" +
      JSON.stringify(obj),
    success: (res) => {
      console.log(res, "res");
      if (res.status == 0) {
        showAlert(0, res.msg);
        setTimeout(() => {
          // location.reload(true);
          location.href = "../main.html";
        }, 1000);
      } else if (res.status == 1) {
        showAlert(1, res.msg);
      }
    },
  });
}
