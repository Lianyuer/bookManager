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
  // 如果搜到了数据，就根据搜到的数据进行页号显示
  if (typeof searchData != "undefined") {
    if (searchData.length > 0) {
      pageCount =
        searchData.length % pageSize == 0
          ? searchData.length / pageSize
          : Math.floor(searchData.length / pageSize) + 1;
    }
  }
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
  // console.log(currentPage, "currentPage");
  // 为新的当前页码添加激活样式
  $(`.page-item:has(a[href="javascript:choosePage(${i})"])`).addClass("active");
  let startIndex = (currentPage - 1) * pageSize;

  let endIndex =
    currentPage * pageSize < allData.length
      ? currentPage * pageSize - 1
      : allData.length - 1;
  console.log(startIndex, endIndex);
  // 如果有搜索到数据，就根据搜到的数据计算要显示的数据下标
  if (typeof searchData != "undefined") {
    if (searchData.length > 0) {
      endIndex =
        currentPage * pageSize < searchData.length
          ? currentPage * pageSize - 1
          : searchData.length - 1;
    }
  }
  var newData = [];
  for (let i = startIndex; i <= endIndex; i++) {
    // 如果searchData被定义了，并且有数据，则push searchData的数据
    if (typeof searchData != "undefined") {
      if (searchData.length > 0) {
        newData.push(searchData[i]);
      } else {
        // searchData被定义了，但是没有数据，就push allData的数据
        newData.push(allData[i]);
      }
    } else {
      newData.push(allData[i]);
    }
    showData(newData);
  }
  console.log(newData, "newData");
  // 获取要更新的标签元素
  const currentPageDom = document.getElementById("currentPageDom");
  const totalCountDom = document.getElementById("totalCountDom");
  // 更新标签内容
  currentPageDom.textContent = `当前第${currentPage}页`;
  totalCountDom.textContent = `共${allData.length}条`;
  // 如果搜索到数据，就更新总条数
  if (typeof searchData != "undefined") {
    if (searchData.length > 0) {
      totalCountDom.textContent = `共${searchData.length}条`;
    }
  }
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
