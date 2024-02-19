var allData;
// 搜索所有页面信息（包含父级）
function search() {
  $.ajax({
    url: "http://localhost:3000/pages/pages_selectAllWithParent",
    success: (res) => {
      allData = res;
      // console.log(res);
      let tr = "";
      res.forEach((element) => {
        tr += `<tr><td>${element.id}</td><td>${element.pageName}</td><td>${element.pageUrl}</td><td>${element.remark}</td><td>${element.parentName}</td><td><button class="btn btn-info mr-2" onclick="">编辑</button><button class="btn btn-danger mr-2" onclick="">删除</button></td></tr>`;
      });
      $(".tShow").html(tr);
      // 展示页码
      showLi();
      // 默认选择第一页
      choosePage(1);
    },
  });
}
