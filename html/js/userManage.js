let idd = -1; // 判断是新增还是编辑
var allData = []; //所有数据
function showData() {
  $.ajax({
    url: "http://localhost:3000/user/user_selectAll",
    success: (res) => {
      allData = res;
      let content = ``;
      res.forEach((element) => {
        content += `<tr>
                    <td>${element.id}</td>
                    <td>${element.idCard}</td>
                    <td>${element.password}</td>
                    <td>${element.realName}</td>
                    <td>${element.phone}</td>
                    <td>${element.address}</td>
                    <td>${element.wxNo}</td>
                    <td>${element.typeId}</td>
                    <td>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="editShow(${element.id})">编辑</button>
                        <button class="btn btn-danger" onclick="del(${element.id})">删除</button>
                    </td>
               </tr>`;
      });
      $(".tShow").html(content);
    },
  });
}

// 删除用户信息
function del(id) {
  if (confirm("确定要删除吗？")) {
    $.ajax({
      url: "http://localhost:3000/user/user_deleteById?id=" + id,
      success: (res) => {
        showAlert(res.status, res.msg);
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
    });
  }
}

// 编辑回显数据
function editShow(id) {
  idd = id;
  $.ajax({
    url: "http://localhost:3000/user/user_selectById?id=" + idd,
    success: (res) => {
      data = res[0];
      $("#id").val(data.id);
      $("#idCard").val(data.idCard);
      $("#pwd").val(data.password);
      $("#name").val(data.realName);
      $("#phone").val(data.phone);
      $("#addr").val(data.address);
      $("#wxNo").val(data.wxNo);
      $("#tid").val(data.typeId);
    },
  });
}

// 新增
function add() {
  idd = -1;
  $("#id").val("");
  $("#idCard").val("");
  $("#pwd").val("");
  $("#name").val("");
  $("#phone").val("");
  $("#addr").val("");
  $("#wxNo").val("");
  $("#tid").val("");
}

function submit() {
  var obj = new Object();
  obj.idCard = $("#idCard").val();
  obj.password = $("#pwd").val();
  obj.realName = $("#name").val();
  obj.phone = $("#phone").val();
  obj.address = $("#addr").val();
  obj.wxNo = $("#wxNo").val();
  obj.typeId = $("#tid").val();

  /**
   * 编辑当前项时，只需要对除了当前项以外的其他项及逆行排重校验即可，自身不需要对自身进行重复校验
   * item.id !== currentItemId && 排除当前项
   */
  let currentItemId = parseInt($("#id").val()); // 记录当前点击回显项的id
  let idCardFlag = allData.some(
    (item) => item.id !== currentItemId && item.idCard == $("#idCard").val()
  );
  let phoneFlag = allData.some(
    (item) => item.id !== currentItemId && item.phone == $("#phone").val()
  );
  if (idCardFlag) {
    showAlert(2, "身份编号不能重复");
    return;
  }
  if (phoneFlag) {
    showAlert(2, "手机号不能重复");
    return;
  }
  $.ajax({
    url: "http://localhost:3000/user/user_addAndEdit",
    data: {
      id: idd,
      userInfo: JSON.stringify(obj),
    },
    success: (res) => {
      showAlert(res.status, res.msg);
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
  });
}
