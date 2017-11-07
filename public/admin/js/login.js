

$(function () {
    $(".btn-primary").on("click", function () {
        var username = $("#inputUserName3").val();
        // console.log(username);
        var password = $("#inputPassword3").val();
        // console.log(password);
        

        // 用户登录实现
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: {
                username:username,
                password:password
            },
            dataType: "json",
            success: function (result) {
                // console.log(result);
                if (result.success) {
                    location.href = "index.html";
                }else if(result.error == 1000 || result.error == 1001){
                    alert(result.message);
                }
            }
        })
    })


})