let pageSize = 5; // 默认页面条数
let currentPage = 1; // 默认当前页
let pageCount = 0; // 总页数

// 改变页面条数
function changePageSize(e) {
  pageSize = $(e).val();
  showLi();
  choosePage(1);
}

// 动态展示页数
function showLi() {
  pageCount =
    allData.length % pageSize == 0
      ? allData.length / pageSize
      : allData.length / pageSize + 1;
  $(".pagination").empty();
  var content = `<li class="page-item"><a href="#" class="page-link">&laquo;</a></li>`;
  for (let i = 1; i < pageCount; i++) {
    content += `<li class="page-item"><a href="#" class="page-link" onclick="choosePage(${i})">${i}</a></li>`;
  }
  content += `<li class="page-item"><a href="#" class="page-link">&raquo;</a></li>`;
  $(".pagination").html(content);
}

// 选择不同的页数展示不同数据
function choosePage(i) {
  currentPage = i;
  var startIndex = (currentPage - 1) * pageSize;
  var endIndex =
    currentPage * pageSize < allData.length
      ? currentPage * pageSize - 1
      : allData.length - 1;
  var newData = [];
  for (let i = startIndex; i <= endIndex; i++) {
    newData.push(allData[i]);
    showData(newData);
  }
}

function showData(data) {
  $(".tShow").html("");
  var content = ``;
  for (let i = 0; i < data.length; i++) {
    content += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].pageName}</td>
        <td>${data[i].pageUrl}</td>
        <td>${data[i].remark}</td>
        <td>${data[i].parentName}</td>
        <td>
          <button class="btn btn-info mr-2" onclick="">编辑</button>
          <button class="btn btn-danger mr-2" onclick="">删除</button>
        </td>
    </tr>`;
  }
  $(".tShow").html(content);
}
