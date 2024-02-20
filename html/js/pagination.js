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
  var content = `<li class="page-item leftPage"><a href="javascript:leftPage()" class="page-link">&laquo;</a></li>`;
  for (let i = 1; i < pageCount; i++) {
    content += `<li class="page-item ${
      currentPage === i ? "active" : ""
    }"><a href="javascript:choosePage(${i})" class="page-link" >${i}</a></li>`;
  }
  content += `<li class="page-item rightPage"><a href="javascript:rightPage()" class="page-link">&raquo;</a></li>`;
  $(".pagination").html(content);
}

// 选择不同的页号展示不同数据
function choosePage(i) {
  // 移除当前激活的页码样式
  $(`.page-item.active`).removeClass("active");
  currentPage = i;
  console.log(currentPage);
  // 为新的当前页码添加激活样式
  $(`.page-item:has(a[href="javascript:choosePage(${i})"])`).addClass("active");
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
  // 获取要更新的标签元素
  const currentPageDom = document.getElementById("currentPageDom");
  const totalCountDom = document.getElementById("totalCountDom");
  // 更新标签内容
  currentPageDom.textContent = `当前第${currentPage}页`;
  totalCountDom.textContent = `共${allData.length}条`;
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

function leftPage() {
  if (currentPage > 1) {
    currentPage--;
    choosePage(currentPage);
    document.querySelector(".rightPage").classList.remove("disabled");
  }
  if (currentPage == 1) {
    document.querySelector(".leftPage").classList.add("disabled");
  }
}

function rightPage() {
  // console.log(pageCount, "pageCount");
  if (currentPage < pageCount) {
    currentPage++;
    choosePage(currentPage);
    document.querySelector(".leftPage").classList.remove("disabled");
  }
  if (currentPage > pageCount) {
    document.querySelector(".rightPage").classList.add("disabled");
  }
}
