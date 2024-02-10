// 生成树形结构菜单
function showMenu() {
  $.ajax({
    url: "http://localhost:3000/pages/selectAll",
    success: (res) => {
      console.log(res);
      let ones = res.filter((item) => {
        return item.pid == 0;
      });
      console.log(ones, "ones");
      let content = "";
      // 一级展示
      ones.forEach((element, index) => {
        content += `<li data-toggle="collapse" href="#collapseMenu-${index}" role="button" aria-expanded="true" aria-controls="collapseMenu-${index}"><a href="#">${element.pageName}</a><span class="iconfont icon-shuzhuang shouqi"></span>`;
        // 对应二级
        let twos = res.filter((item) => {
          return item.pid == element.id;
        });
        console.log(twos, "twos");
        content += `<ol class='collapse in' id='collapseMenu-${index}'>`;
        twos.forEach((item) => {
          content += `<a href="#">${item.pageName}</a>`;
        });
        content += `</ol></li>`;
      });
      $("#ulShow").append(content);
    },
  });
}
