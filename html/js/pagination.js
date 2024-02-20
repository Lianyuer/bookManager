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
      : Math.floor(allData.length / pageSize) + 1;
  $(".pagination").empty();
  var content = `<li class="page-item prevPage"><a href="javascript:prevPage()" class="page-link">&laquo;</a></li>`;
  for (let i = 1; i <= pageCount; i++) {
    content += `<li class="page-item ${
      currentPage === i ? "active" : ""
    }"><a href="javascript:choosePage(${i})" class="page-link" >${i}</a></li>`;
  }
  content += `<li class="page-item nextPage"><a href="javascript:nextPage()" class="page-link">&raquo;</a></li>`;
  $(".pagination").html(content);
}

// 选择不同的页号展示不同数据
function choosePage(i) {
  // 移除当前激活的页码样式
  $(`.page-item.active`).removeClass("active");
  // 移除当前禁用样式
  $(`.page-item.disabled`).removeClass("disabled");
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

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    choosePage(currentPage);
    // document.querySelector(".nextPage").classList.remove("disabled");
    $(".nextPage").removeClass("disabled");
  }
  if (currentPage == 1) {
    // document.querySelector(".prevPage").classList.add("disabled");
    $(".prevPage").addClass("disabled");
  }
}

function nextPage() {
  console.log(pageCount, "pageCount");
  if (currentPage < pageCount) {
    currentPage++;
    choosePage(currentPage);
    // document.querySelector(".prevPage").classList.remove("disabled");
    $(".prevPage").removeClass("disabled");
  }
  if (currentPage == pageCount) {
    // document.querySelector(".rightPage").classList.add("disabled");
    $(".nextPage").addClass("disabled");
  }
}
