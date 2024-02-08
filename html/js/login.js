function login() {
  console.log($("#tCodes").val(), trueCode);
  if (
    ($("#tName").val() == "") |
    ($("#tPwd").val() == "") |
    ($("#tCodes").val() == "")
  ) {
    $(".alert").fadeIn();
    $(".msg")[0].innerHTML = "信息不能为空！";
    setTimeout(function () {
      $(".alert").fadeOut();
    }, 1000);
  } else if (
    $("#tName").val() !== "" &&
    $("#tPwd").val() !== "" &&
    $("#tCodes").val() == trueCode
  ) {
    $.ajax({
      url:
        "http://localhost:3000/login?phone=" +
        $("#tName").val() +
        "&password=" +
        $("#tPwd").val(),
      success: (res) => {
        // 登录成功，进行跳转
        if (res.status == 1) {
          console.log(res);
          // 本地存储用户信息
          localStorage.setItem("loginUser", JSON.stringify(res.data[0]));
          // 提示信息
          showAlert(0, res.msg);
          setTimeout(() => {
            location.href = "./main.html";
          }, 800);
        } else {
          // 提示信息
          showAlert(1, res.msg);
        }
      },
    });
  } else if ($("#tCodes").val() !== trueCode) {
    showAlert(1, "验证码错误");
  }
}
