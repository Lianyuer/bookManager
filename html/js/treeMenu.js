function showMenu() {
  // 发起 AJAX 请求，从服务器获取所有菜单项数据
  $.ajax({
    url: "http://localhost:3000/pages/pages_selectAll",
    success: (res) => {
      console.log(res, "res");
      // 创建一个映射对象，用于存储菜单项及其子菜单项，map是计算结束后返回的值，是下一次调用回调时的第一个参数；item是当前值
      const itemMap = res.reduce((map, item) => {
        // 将每个菜单项添加到映射中，并初始化其子菜单项数组
        map[item.id] = { ...item, subItems: [] };

        // 如果菜单项没有父级（顶级菜单项），则标记为顶级
        if (item.pid === 0) {
          map[item.id].topLevel = true;
        } else {
          // 如果菜单项有父级，则将其添加到父级菜单项的子菜单项数组中
          const parentId = item.pid;
          if (map[parentId]) {
            map[parentId].subItems.push(item);
          }
        }

        return map;
      }, {});
      console.log(itemMap, "itemMap");

      // 从映射中提取所有顶级菜单项，返回一个新数组
      const topLevelItems = Object.values(itemMap).filter(
        (item) => item.topLevel
      );

      // 构建顶级菜单项的 HTML 内容
      const listGroupContent = topLevelItems
        .map((topItem) => {
          let subItemsHtml = "";

          // 如果顶级菜单项有子菜单项，则构建子菜单项的 HTML 内容
          if (topItem.subItems.length > 0) {
            // 为子菜单项创建一个唯一的 collapse ID
            const collapseId = `collapse-${topItem.id}`;
            // 构建子菜单项的列表组，并将其包装在一个 collapse 元素中
            subItemsHtml =
              `<div class="collapse collapseBox" id="${collapseId}">` +
              `<ul class="list-group list-group-flush subItemGroup">` +
              topItem.subItems
                .map(
                  (subItem) =>
                    // 将子菜单项转换为 a 标签，设置a标签的 target 值为 main.html中的 iframe标签的name值，并设置 href 属性
                    `<li class="list-group-item subItem"><a target="iframe1" href='${subItem.pageUrl}'>${subItem.pageName}</a></li>`
                )
                .join("") +
              `</ul>` +
              `</div>`;

            // 创建折叠触发器的按钮，并设置 data-target 属性以指向相应的 collapse 元素
            const triggerButton = `<div class="list-group topItem"  data-toggle="collapse" data-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">${topItem.pageName}</div>`;

            // 返回顶级菜单项的 HTML 内容，包括折叠触发器和子菜单项
            return triggerButton + subItemsHtml;
          } else {
            // 如果顶级菜单项没有子菜单项，则只创建一个 a 标签
            return `<li class="list-group-item"><a href="#">${topItem.pageName}</a></li>`;
          }
        })
        .join("");

      // 清空 ulShow 元素的内容，并添加新构建的列表组内容
      $("#ulShow")
        .empty()
        .append(`<ul class="list-group">${listGroupContent}</ul>`);

      console.log(
        document.querySelector(".collapseBox").style.display,
        "display"
      );

      // 初始化所有 collapse 元素以启用折叠功能
      $(".collapse").collapse();
    },
    error: (xhr, status, error) => {
      // 处理 AJAX 请求失败的情况
      console.error("An error occurred:", error);
    },
  });
}

// function handleSubItem(pageName) {
//   console.log(pageName, "pageName");

//   // $(".divRight").html(pageName);
// }
