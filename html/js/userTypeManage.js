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
