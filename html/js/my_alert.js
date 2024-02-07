// 警告框，index的值：0代表成功，1代表失败
function showAlert(index, msg) {
  // const alerts = document.querySelectorAll(".alert");
  // for (let i = 0; i < alerts.length; i++) {
  //   alerts[i].style.display = "none";
  // }
  // alerts[index].style.display = "block";

  // $(".msgText").eq(index).html(msg);

  // jquery 循环的另一种写法
  // $(".my_alert .alert").each(function (i, value) {
  //   $(".my_alert .alert").eq(i).fadeOut();
  // });

  $(".my_alert .alert").eq(index).fadeIn();
  $(".msgText").eq(index).html(msg);

  setTimeout(() => {
    $(".my_alert .alert").eq(index).fadeOut();
  }, 800);
}
